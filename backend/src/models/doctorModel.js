import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Doctor = sequelize.define(
    "doctor",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        patients: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    },
);

export default Doctor;
