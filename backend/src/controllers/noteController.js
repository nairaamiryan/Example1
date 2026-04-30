const db = require("../models/index");
const Note = db.Note;

const getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({
            order: [["date", "DESC"]],
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addNote = async (req, res) => {
    try {
        const { title, description, type, date } = req.body;
        const note = await Note.create({ title, description, type, date });
        res.json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getNotes, addNote };
