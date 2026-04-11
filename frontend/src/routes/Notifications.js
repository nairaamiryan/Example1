import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { LOADING, NOTIFICATIONS } from "../constants";
import NotificationCard from "../components/NotificationCard";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        const response = await api.getNotifications();
        console.log("Notifications response:", response);
        if (response.success) {
            setNotifications(response.data);
        }
        setLoading(false);
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
                <h1 style={styles.title}>{NOTIFICATIONS.TITLE}</h1>

                <div style={styles.list}>
                    {notifications.map((item) => (
                        <NotificationCard key={item.id} item={item} />
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
    loading: {
        textAlign: "center",
        padding: "60px",
    },
};

export default Notification;
