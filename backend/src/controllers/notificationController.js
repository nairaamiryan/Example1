const db = require("../models/index");
const Notification = db.Notification;

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            order: [["date", "DESC"]],
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) return res.status(404).json({ message: "Not found" });
        await notification.update(req.body);
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) return res.status(404).json({ message: "Not found" });
        await notification.destroy();
        res.json({ message: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotifications, updateNotification, deleteNotification };
