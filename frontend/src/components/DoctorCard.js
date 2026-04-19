import React, { useState } from "react";
import { PATIENT } from "../constants";

const DoctorCard = ({ doctor, onDelete, onClick }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                ...styles.doctorCard,
                transform: hovered ? "scale(1.03)" : "scale(1)",
                boxShadow: hovered
                    ? "0 8px 24px rgba(0,0,0,0.18)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onClick && onClick(doctor)}
        >
            <button
                style={styles.deleteBtn}
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(doctor.id);
                }}
            >
                ✕
            </button>
            <div style={styles.doctorAvatar}>{doctor?.name[0]}</div>
            <div style={styles.doctorName}>{doctor?.name} {doctor?.surname}</div>
            <div style={styles.doctorSpecialty}>{doctor?.specialty}</div>
            <div style={styles.doctorPatients}>
                {doctor?.patients} {PATIENT}
            </div>
        </div>
    );
};

const styles = {
    doctorCard: {
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
    },
    deleteBtn: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "transparent",
        border: "none",
        fontSize: "14px",
        cursor: "pointer",
        color: "#9ca3af",
        padding: "2px 6px",
        borderRadius: "6px",
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
