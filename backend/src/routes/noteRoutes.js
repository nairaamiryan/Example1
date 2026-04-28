import express from "express";
import { getNotes, addNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", addNote);

export default router;
