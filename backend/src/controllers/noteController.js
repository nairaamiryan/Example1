const db = require("../models/index");
const Note = db.Note;

const getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({ order: [["date", "DESC"]] });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addNote = async (req, res) => {
    try {
        const { title, description, type, date } = req.body;
        const note = await Note.create({ title, description, type, date });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        await note.update(req.body);
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        await note.destroy();
        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotes, addNote, updateNote, deleteNote };
