const express = require("express");
const { getReports, addReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/", getReports);
router.post("/", addReport);

module.exports = router;
