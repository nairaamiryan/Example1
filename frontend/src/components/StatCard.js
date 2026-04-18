import React from "react";

const StatCard = ({ icon, title, value, color }) => {
    return (
        <div style={{ ...styles.card, borderLeft: `4px solid ${color}` }}>
            <div style={styles.icon}>{icon}</div>
            <div style={styles.content}>
                <div style={styles.title}>{title}</div>
                <div style={{ ...styles.value, color }}>{value}</div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    icon: {
        fontSize: "32px",
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "5px",
    },
    value: {
        fontSize: "24px",
        fontWeight: "600",
    },
};

export default StatCard;
