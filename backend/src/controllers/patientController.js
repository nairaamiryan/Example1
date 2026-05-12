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
            if (parts.length >= 2) {
                where[Op.or] = [
                    {
                        [Op.and]: [
                            { name_lower: { [Op.like]: `%${parts[0]}%` } },
                            { surname_lower: { [Op.like]: `%${parts[1]}%` } },
                        ]
                    },
                    {
                        [Op.and]: [
                            { name_lower: { [Op.like]: `%${parts[1]}%` } },
                            { surname_lower: { [Op.like]: `%${parts[0]}%` } },
                        ]
                    },
                ];
            } else {
                where[Op.or] = [
                    { name_lower: { [Op.like]: `%${trimmedSearch}%` } },
                    { surname_lower: { [Op.like]: `%${trimmedSearch}%` } },
                ];
            }
        }
        const parsedLimit = Math.max(1, parseInt(limit) || 10);
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
        const { id, name, surname, age, diagnosis, status, email } = req.body;
        const patient = await Patient.create({
            id,
            name,
            surname,
            age,
            diagnosis,
            status,
            email,
        });
        await db.sequelize.query(
            `UPDATE "patients" SET name_lower = :nameLower, surname_lower = :surnameLower WHERE id = :id`,
            {
                replacements: {
                    nameLower: name ? name.toLowerCase() : "",
                    surnameLower: surname ? surname.toLowerCase() : "",
                    id: patient.id,
                },
            }
        );
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });

        await patient.update(req.body);
        if (req.body.name || req.body.surname) {
            const newName = req.body.name !== undefined ? req.body.name : patient.name;
            const newSurname = req.body.surname !== undefined ? req.body.surname : patient.surname;
            await db.sequelize.query(
                `UPDATE "patients" SET name_lower = :nameLower, surname_lower = :surnameLower WHERE id = :id`,
                {
                    replacements: {
                        nameLower: newName ? newName.toLowerCase() : "",
                        surnameLower: newSurname ? newSurname.toLowerCase() : "",
                        id: req.params.id,
                    },
                }
            );
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        await patient.destroy();
        res.json({ message: "Patient deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getPatients, createPatient, updatePatient, deletePatient };
