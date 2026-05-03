const express = require("express");
const { getStatistics } = require("../controllers/homeController");

const router = express.Router();

router.get("/", getStatistics);

module.exports = router;
