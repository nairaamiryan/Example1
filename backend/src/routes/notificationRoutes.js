const express = require("express");
const { getNotifications, deleteNotification } = require("../controllers/notificationController");

const router = express.Router();

router.get("/", getNotifications);
router.delete("/:id", deleteNotification);

module.exports = router;
