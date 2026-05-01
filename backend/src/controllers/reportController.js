const db = require("../models/index");
const Report = db.Report;

const getReports = async (req, res) => {
    try {
        const reports = await Report.findAll({ order: [["date", "DESC"]] });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addReport = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const report = await Report.create({ title, description, date });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReport = async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) return res.status(404).json({ message: "Report not found" });
        await report.update(req.body);
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReport = async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) return res.status(404).json({ message: "Report not found" });
        await report.destroy();
        res.json({ message: "Report deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReports, addReport, updateReport, deleteReport };
