import React from "react";

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

const NotificationCard = ({ key, item }) => {
    const getIcon = (type) => {
        switch (type) {
            case "patient":
                return "👤";
            case "doctor":
                return "🩺";
            case "appointment":
                return "📅";
            case "system":
                return "⚙️";
            default:
                return "🔔";
        }
    };

    return (
        <div key={key} style={styles.card}>
            <div style={styles.icon}>{getIcon(item.type)}</div>
            <div>
                <div style={styles.cardTitle}>{item.title}</div>
                <div style={styles.cardText}>{item.message}</div>
                <div style={styles.time}>{formatTime(item.time)}</div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        display: "flex",
        gap: "15px",
        padding: "15px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    },
    icon: {
        fontSize: "22px",
    },
    cardTitle: {
        fontWeight: "600",
        marginBottom: "4px",
    },
    cardText: {
        fontSize: "14px",
        color: "#6b7280",
    },
    time: {
        fontSize: "12px",
        color: "#9ca3af",
        marginTop: "5px",
    },
};

export default NotificationCard;
