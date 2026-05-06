const db = require("../models/index");
const About = db.About;

const getAboutInfo = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) return res.status(404).json({ message: "About info not found" });
        res.json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAboutInfo };
