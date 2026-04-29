import db from "../models/index.js";

const Report = db.Report;

export const getReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            order: [["date", "DESC"]],
        });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addReport = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const report = await Report.create({ title, description, date });
        res.json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
