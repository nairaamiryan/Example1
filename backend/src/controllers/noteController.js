import db from "../models/index.js";

const Note = db.Note;

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({
            order: [["date", "DESC"]],
        });
        res.json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addNote = async (req, res) => {
    try {
        const { title, content, date } = req.body;
        const note = await Note.create({ title, content, date });
        res.json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
