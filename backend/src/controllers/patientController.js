const { Op } = require("sequelize");
const db = require("../models/index");
const Patient = db.Patient;

const getPatients = async (req, res) => {
    try {
        const { limit, offset, search } = req.query;

        const where = {};
        if (search && search.trim() !== "") {
            where[Op.or] = [
                { name:      { [Op.iRegexp]: search } },
                { surname:   { [Op.iRegexp]: search } },
                { diagnosis: { [Op.iRegexp]: search } },
                { email:     { [Op.iRegexp]: search } },
            ];
        }

        // When searching — no pagination, return all matches
        if (search && search.trim() !== "") {
            const patients = await Patient.findAll({ where, order: [["id", "ASC"]] });
            return res.json({ patients, total: patients.length });
        }

        // Normal paginated fetch
        const parsedLimit  = Math.max(1, parseInt(limit)  || 10);
        const parsedOffset = Math.max(0, parseInt(offset) || 0);

        const { count, rows } = await Patient.findAndCountAll({
            where,
            limit:  parsedLimit,
            offset: parsedOffset,
            order:  [["id", "ASC"]],
        });

        res.json({ patients: rows, total: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createPatient = async (req, res) => {
    try {
        const { name, surname, age, diagnosis, status, email } = req.body;
        const patient = await Patient.create({ name, surname, age, diagnosis, status, email });
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        await patient.update(req.body);
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        await patient.destroy();
        res.json({ message: "Patient deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getPatients, createPatient, updatePatient, deletePatient };
