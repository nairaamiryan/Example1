const express = require("express");
const { getFinances, addFinance } = require("../controllers/financeController");

const router = express.Router();

router.get("/", getFinances);
router.post("/", addFinance);

module.exports = router;
