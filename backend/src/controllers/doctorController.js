import db from "../models/index.js";

const Doctor = db.Doctor;

export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const createDoctor = async (req, res) => {
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
