import React from "react";
import { PATIENTS, STATUS_COLORS } from "../constants";

const PatientCard = ({ patient }) => {
    return (
        <div style={styles.card}>
            <div style={styles.avatar}>
                {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
            </div>
            <div style={styles.info}>
                <div style={styles.name}>{patient.name}</div>
                <div style={styles.diagnosis}>{patient.diagnosis}</div>
                <div style={styles.age}>
                    {PATIENTS.AGE} {patient.age}
                </div>
            </div>
            <div
                style={{
                    ...styles.status,
                    background: STATUS_COLORS(patient.status),
                }}
            >
                {patient.status}
            </div>
        </div>
    );
};

const styles = {
    card: {
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "12px",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    avatar: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #67df6f 0%, #4ba292 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "14px",
        flexShrink: 0,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "4px",
    },
    diagnosis: {
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "2px",
    },
    age: {
        fontSize: "12px",
        color: "#9ca3af",
    },
    status: {
        padding: "5px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "500",
        textTransform: "capitalize",
        color: "white",
    },
};

export default PatientCard;
