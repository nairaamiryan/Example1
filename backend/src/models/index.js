import sequelize from "../config/db.js";
import Patient from "./patientModel.js";
import Doctor from "./doctorModel.js";

const db = {};

db.sequelize = sequelize;
db.Patient = Patient;
db.Doctor = Doctor;

export default db;
