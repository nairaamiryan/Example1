import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notes", noteRoutes);

export default app;
