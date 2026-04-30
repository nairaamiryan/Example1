const express = require("express");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const reportRoutes = require("./routes/reportRoutes");
const noteRoutes = require("./routes/noteRoutes");
const financeRoutes = require("./routes/financeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/finances", financeRoutes);

module.exports = app;
