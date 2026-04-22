import db from "../models/index.js";

export const getDoctors = async (req, res) => {
    try {
        const doctors = await db.Doctor.findAll();
        console.log("Fetched doctors:", doctors);
        res.json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const createDoctor = async (req, res) => {
    const { name, surname, age, email, specialty } = req.body;

    const doctor = await db.Doctor.create({
        name,
        surname,
        age,
        email,
        specialty,
        patients: 0,
    });

    res.status(201).json(doctor);
};
