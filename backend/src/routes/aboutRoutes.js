const express = require("express");
const { getAboutInfo } = require("../controllers/aboutController");

const router = express.Router();

router.get("/", getAboutInfo);

module.exports = router;
