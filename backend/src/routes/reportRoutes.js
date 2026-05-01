const express = require("express");
const { getReports, addReport, updateReport, deleteReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/", getReports);
router.post("/", addReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

module.exports = router;
