const { Op } = require("sequelize");
const db = require("../models/index");
const Patient = db.Patient;
const { sequelize } = db;

const getPatients = async (req, res) => {
    try {
        const { limit, offset, search } = req.query;

        const where = {};
        if (search && search.trim() !== "") {
            const trimmedSearch = search.trim().toLowerCase();
            const parts = trimmedSearch.split(/\s+/);

            const likeName    = (val) => sequelize.where(sequelize.fn("LOWER", sequelize.col("name")),    { [Op.like]: `%${val}%` });
            const likeSurname = (val) => sequelize.where(sequelize.fn("LOWER", sequelize.col("surname")), { [Op.like]: `%${val}%` });

            if (parts.length >= 2) {
                where[Op.or] = [
                    { [Op.and]: [likeName(parts[0]), likeSurname(parts[1])] },
                    { [Op.and]: [likeName(parts[1]), likeSurname(parts[0])] },
                ];
            } else {
                where[Op.or] = [
                    likeName(trimmedSearch),
                    likeSurname(trimmedSearch),
                ];
            }
        }

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
        console.error("getPatients error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const createPatient = async (req, res) => {
    try {
        const { id, name, surname, age, diagnosis, status, email } = req.body;
        const patient = await Patient.create({ id, name, surname, age, diagnosis, status, email });
        res.status(201).json(patient);
    } catch (error) {
        console.error("createPatient error:", error);
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
        console.error("updatePatient error:", error);
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
        console.error("deletePatient error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getPatients, createPatient, updatePatient, deletePatient };
