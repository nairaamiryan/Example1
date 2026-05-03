const db = require("../models/index");

const getStatistics = async (req, res) => {
    try {
        const rows = await db.Home.findAll();
        const data = rows.reduce((acc, row) => {
            acc[row.key] = row.value;

            return acc;
        }, {});
        res.json({
            counts: data.counts || {},
            byStatus: data.byStatus || {},
            bySpecialty: data.bySpecialty || {},
            topDoctors: data.topDoctors || [],
            finances: data.finances || {},
            recentNotifications: data.notifications || [],
            timeline: data.timeline || {},
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getStatistics };
