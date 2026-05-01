const db = require("../models/index");
const Patient = db.Patient;

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
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
