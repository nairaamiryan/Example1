const express = require("express");
const { getNotes, addNote, updateNote, deleteNote } = require("../controllers/noteController");

const router = express.Router();

router.get("/", getNotes);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
