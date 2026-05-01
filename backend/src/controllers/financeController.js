const db = require("../models/index");
const Finance = db.Finance;

const getFinances = async (req, res) => {
    try {
        const finances = await Finance.findAll({ order: [["date", "DESC"]] });
        res.json(finances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addFinance = async (req, res) => {
    try {
        const { title, description, amount, type, date } = req.body;
        const finance = await Finance.create({ title, description, amount, type, date });
        res.status(201).json(finance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFinance = async (req, res) => {
    try {
        const finance = await Finance.findByPk(req.params.id);
        if (!finance) return res.status(404).json({ message: "Finance not found" });
        await finance.update(req.body);
        res.json(finance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFinance = async (req, res) => {
    try {
        const finance = await Finance.findByPk(req.params.id);
        if (!finance) return res.status(404).json({ message: "Finance not found" });
        await finance.destroy();
        res.json({ message: "Finance deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getFinances, addFinance, updateFinance, deleteFinance };
