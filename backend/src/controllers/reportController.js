const db = require("../models/index");
const Report = db.Report;

const getReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            order: [["date", "DESC"]],
        });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addReport = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const report = await Report.create({ title, description, date });
        res.json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getReports, addReport };
