import app from "./app.js";
import db from "./models/index.js";
import "./config/env.js";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected");

        await db.sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();
