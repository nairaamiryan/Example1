import db from "../models/index.js";

const Patient = db.Patient;

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const createPatient = async (req, res) => {
    const { name, surname, age, diagnosis, status, email } = req.body;

    const patient = await Patient.create({
        name,
        surname,
        age,
        diagnosis,
        status,
        email,
    });

    res.status(201).json(patient);
};
