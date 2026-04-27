import fs from "fs";

import path from "path";

import { fileURLToPath } from "url";

import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import configFile from "../config/config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const files = fs
    .readdirSync(__dirname)
    .filter(
        (file) => file !== path.basename(__filename) && file.endsWith(".js"),
    );

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);

const db = {};

for (const file of files) {
    const modelModule = await import(`./${file}`);
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
