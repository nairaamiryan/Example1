const express = require("express");
const { getNotes, addNote } = require("../controllers/noteController");

const router = express.Router();

router.get("/", getNotes);
router.post("/", addNote);

module.exports = router;
