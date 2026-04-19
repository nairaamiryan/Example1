import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { LOADING, NOTIFICATIONS } from "../constants";
import NotificationCard from "../components/NotificationCard";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        const response = await api.getNotifications();
        if (response.success) {
            const data = response.data.map((item) => ({ ...item, read: false }));
            setNotifications(data);
        }
        setLoading(false);
    };

    const markAllRead = () => {
        setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    };

    const handleDelete = (id) => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));
    };

    const handleRead = (id) => {
        setNotifications((prev) =>
            prev.map((item) => item.id === id ? { ...item, read: true } : item)
        );
    };

    const filtered = notifications.filter((item) => {
        if (filter === "read") return item.read;
        if (filter === "unread") return !item.read;
        return true;
    });

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
                <div style={styles.header}>
                    <h1 style={styles.title}>{NOTIFICATIONS.TITLE}</h1>
                    <button style={styles.markAllBtn} onClick={markAllRead}>
                        Բոլորը կարդացած նշել
                    </button>
                </div>

                <div style={styles.filters}>
                    {["all", "unread", "read"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={filter === f ? styles.filterBtnActive : styles.filterBtn}
                        >
                            {f === "all" ? "Բոլորը" : f === "unread" ? "Չկարդացած" : "Կարդացած"}
                        </button>
                    ))}
                </div>

                <div style={styles.list}>
                    {filtered.map((item) => (
                        <NotificationCard
                            key={item.id}
                            item={item}
                            onDelete={handleDelete}
                            onRead={handleRead}
                        />
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
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    title: {
        fontSize: "28px",
        fontWeight: "600",
    },
    markAllBtn: {
        padding: "8px 16px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
    },
    filters: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },
    filterBtn: {
        padding: "7px 16px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        background: "white",
        cursor: "pointer",
        fontSize: "14px",
        color: "#6b7280",
    },
    filterBtnActive: {
        padding: "7px 16px",
        borderRadius: "8px",
        border: "1px solid #2563eb",
        background: "#2563eb",
        cursor: "pointer",
        fontSize: "14px",
        color: "white",
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
