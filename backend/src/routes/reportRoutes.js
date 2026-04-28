import express from "express";
import { getReports, addReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getReports);
router.post("/", addReport);

export default router;
