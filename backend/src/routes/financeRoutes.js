const express = require("express");
const { getFinances, addFinance, updateFinance, deleteFinance } = require("../controllers/financeController");

const router = express.Router();

router.get("/", getFinances);
router.post("/", addFinance);
router.put("/:id", updateFinance);
router.delete("/:id", deleteFinance);

module.exports = router;
