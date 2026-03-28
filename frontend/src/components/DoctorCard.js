import React from "react";
import { PATIENT } from "../constants";

const DoctorCard = ({ doctor }) => (
    <div style={styles.doctorCard}>
        <div style={styles.doctorAvatar}>{doctor.name.split(".")[1][0]}</div>
        <div style={styles.doctorName}>{doctor.name}</div>
        <div style={styles.doctorSpecialty}>{doctor.specialty}</div>
        <div style={styles.doctorPatients}>
            {doctor.patients} {PATIENT}
        </div>
    </div>
);

const styles = {
    doctorCard: {
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    doctorAvatar: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #66a8ea 0%, #1ba073 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "600",
        margin: "0 auto 15px",
    },
    doctorName: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "5px",
    },
    doctorSpecialty: {
        fontSize: "14px",
        color: "#6b7280",
        marginBottom: "8px",
    },
    doctorPatients: {
        fontSize: "12px",
        color: "#9ca3af",
    },
};

export default DoctorCard;
