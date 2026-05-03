const express = require("express");
const { getNotifications, updateNotification, deleteNotification } = require("../controllers/notificationController");
const router = express.Router();

router.get("/", getNotifications);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
