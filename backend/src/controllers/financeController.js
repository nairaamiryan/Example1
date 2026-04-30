const db = require("../models/index");
const Finance = db.Finance;

const getFinances = async (req, res) => {
    try {
        const finances = await Finance.findAll({
            order: [["date", "DESC"]],
        });
        res.json(finances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addFinance = async (req, res) => {
    try {
        const { title, description, amount, type, date } = req.body;
        const finance = await Finance.create({ title, description, amount, type, date });
        res.json({ success: true, data: finance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getFinances, addFinance };
