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

            const likeName = (val) => ({ name_lower: { [Op.like]: `%${val}%` } });
            const likeSurname = (val) => ({ surname_lower: { [Op.like]: `%${val}%` } });

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

        const parsedLimit = Math.max(1, parseInt(limit) || 10);
        const parsedOffset = Math.max(0, parseInt(offset) || 0);

        const { count, rows } = await Patient.findAndCountAll({
            where,
            limit: parsedLimit,
            offset: parsedOffset,
            order: [["id", "ASC"]],
            include: [{
                model: db.Doctor,
                as: "doctor",
                attributes: ["id", "name", "surname", "specialty"]
            }]
        });

        res.json({ patients: rows, total: count });
    } catch (error) {
        console.error("getPatients error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const createPatient = async (req, res) => {
    try {
        const { id, name, surname, age, diagnosis, status, email, doctorId } = req.body;

        let finalDoctorId = doctorId;
        if (!finalDoctorId) {
            const doctors = await db.Doctor.findAll();
            const specialtyMap = {
                "Հիպերտոնիա": "Կարդիոլոգ",
                "Դիաբետ": "Էնդոկրինոլոգ",
                "Միգրեն": "Նյարդաբան",
                "Արթրիտ": "Ուղղափայտաբույժ",
                "Ինսուլտ": "Նյարդաբան",
                "Ասթմա": "Թերապևտ",
                "Սրտի իշեմիա": "Կարդիոլոգ",
                "Թիրոիդ": "Էնդոկրինոլոգ",
                "Բրոնխիտ": "Թերապևտ",
                "Պնեւմոնիա": "Թերապևտ",
                "Գաստրիտ": "Թերապևտ",
                "Կոլիտ": "Թերապևտ",
                "Անեմիա": "Թերապևտ",
                "Արտրոզ": "Ուղղափայտաբույժ",
                "Օստեոպորոզ": "Ուղղափայտաբույժ",
                "Բարձր քոլեստերին": "Կարդիոլոգ",
                "Կարդիոմիոպաթիա": "Կարդիոլոգ",
                "Երիկամային անբավարարություն": "Ուրոլոգ",
                "Դեպրեսիա": "Նյարդաբան",
                "Անհանգստություն": "Նյարդաբան",
                "Հիստերիա": "Նյարդաբան",
                "Շաքարային հիվանդություն": "Էնդոկրինոլոգ",
                "Սրտի անբավարարություն": "Կարդիոլոգ",
                "Գլխացավ": "Նյարդաբան",
                "Քնի խանգարում": "Նյարդաբան"
            };
            const spec = specialtyMap[diagnosis];
            const therapist = doctors.find(d => d.specialty === "Թերապևտ") || doctors[0];
            if (spec) {
                const doc = doctors.find(d => d.specialty === spec);
                finalDoctorId = doc ? doc.id : therapist.id;
            } else {
                finalDoctorId = therapist.id;
            }
        }

        const patient = await Patient.create({
            id,
            name,
            surname,
            age,
            diagnosis,
            status,
            email,
            doctorId: finalDoctorId,
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
