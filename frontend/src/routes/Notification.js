import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { LOADING } from "../constants";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        const response = await api.getNotifications();
        if (response.success) {
            setNotifications(response.data);
        }
        setLoading(false);
    };

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

    if (loading) {
        return (
            <div>
                <Navbar />
                <div style={styles.loading}>{LOADING}</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />

            <div style={styles.container}>
                <h1 style={styles.title}>Notifications</h1>

                <div style={styles.list}>
                    {notifications.map((item) => (
                        <div key={item.id} style={styles.card}>
                            <div style={styles.icon}>
                                {getIcon(item.type)}
                            </div>

                            <div>
                                <div style={styles.cardTitle}>
                                    {item.title}
                                </div>
                                <div style={styles.cardText}>
                                    {item.message}
                                </div>
                                <div style={styles.time}>
                                    {item.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px",
    },
    title: {
        fontSize: "28px",
        fontWeight: "600",
        marginBottom: "20px",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
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
    loading: {
        textAlign: "center",
        padding: "60px",
    },
};

export default Notification;
