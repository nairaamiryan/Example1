import React from "react";

const formatTime = (item) => {
    const raw = item.date || item.time;
    if (!raw) return "";
    const date = new Date(raw);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString("hy-AM");
};

const getIcon = (type) => {
    switch (type) {
        case "patient": return "👤";
        case "doctor": return "🩺";
        case "appointment": return "📅";
        case "prescription": return "🔔";
        case "system": return "⚙️";
        default: return "🔔";
    }
};

const NotificationCard = ({ item, onDelete, onRead }) => {
    return (
        <div
            style={{ ...styles.card, background: item.read ? "#f9fafb" : "white" }}
            onClick={() => onRead(item.id)}
        >
            <div style={styles.icon}>{getIcon(item.type)}</div>
            <div style={styles.content}>
                <div style={styles.cardTitle}>{item.title}</div>
                <div style={styles.cardText}>{item.message}</div>
                <div style={styles.time}>{formatTime(item)}</div>
            </div>
            {!item.read && <div style={styles.unreadDot} />}
            <button
                style={styles.deleteBtn}
                onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                title="Ջնջել"
            >
                ✕
            </button>
        </div>
    );
};

const styles = {
    card: {
        display: "flex", gap: "15px", padding: "15px", borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)", alignItems: "center",
        cursor: "pointer",
    },
    icon: { fontSize: "22px" },
    content: { flex: 1 },
    cardTitle: { fontWeight: "600", marginBottom: "4px" },
    cardText: { fontSize: "14px", color: "#6b7280" },
    time: { fontSize: "12px", color: "#9ca3af", marginTop: "5px" },
    unreadDot: {
        width: "10px", height: "10px", borderRadius: "50%",
        background: "#2563eb", flexShrink: 0,
    },
    deleteBtn: {
        background: "transparent", border: "none", fontSize: "16px",
        cursor: "pointer", color: "#9ca3af", padding: "4px 8px",
        borderRadius: "6px", flexShrink: 0,
    },
};

export default NotificationCard;
