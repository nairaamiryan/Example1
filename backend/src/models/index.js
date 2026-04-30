const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");
const configFile = require("../config/config.js");

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
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
