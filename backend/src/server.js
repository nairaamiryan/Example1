const app = require("./app");
const db = require("./models/index");
require("./config/env");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected");
        await db.sequelize.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();
