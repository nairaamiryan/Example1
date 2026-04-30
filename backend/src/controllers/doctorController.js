const db = require("../models/index");
const Doctor = db.Doctor;

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const createDoctor = async (req, res) => {
    const { name, surname, age, email, specialty } = req.body;
    const doctor = await Doctor.create({
        name,
        surname,
        age,
        email,
        specialty,
        patients: 0,
    });
    res.status(201).json(doctor);
};

module.exports = { getDoctors, createDoctor };
