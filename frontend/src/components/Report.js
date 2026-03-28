import React from "react";

const Report = ({ report }) => {
    return (
        <div style={styles.card}>
            <div style={styles.title}>{report.title}</div>
            <div style={styles.description}>{report.description}</div>
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
    title: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "4px",
    },
    description: {
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "2px",
    },
};

export default Report;
