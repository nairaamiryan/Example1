const db = require("../models/index");
const Doctor = db.Doctor;

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const createDoctor = async (req, res) => {
    try {
        const { name, surname, age, email, specialty } = req.body;
        const doctor = await Doctor.create({ name, surname, age, email, specialty, patients: 0 });
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        await doctor.update(req.body);
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        await doctor.destroy();
        res.json({ message: "Doctor deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor };
