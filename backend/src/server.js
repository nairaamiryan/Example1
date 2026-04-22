import app from "./app.js";
import sequelize from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected");

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();
