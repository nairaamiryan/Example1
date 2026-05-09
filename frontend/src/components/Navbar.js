import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NAVBAR } from "./constants";
import api from "../services/api";

const FICTIVE_UNREAD_COUNT = 3;

const Navbar = () => {
    const [unreadCount, setUnreadCount] = useState(0);

    const refreshCount = () => {
        const count = parseInt(localStorage.getItem("unreadCount") || "0");
        setUnreadCount(count);
    };

    useEffect(() => {
        const loadInitial = async () => {
            const stored = localStorage.getItem("unreadCount");
            if (stored !== null) {
                setUnreadCount(parseInt(stored));
                return;
            }
            const response = await api.getNotifications();
            if (response.success) {
                const apiUnread = response.data.length;
                const total = apiUnread + FICTIVE_UNREAD_COUNT;
                localStorage.setItem("unreadCount", total);
                setUnreadCount(total);
            }
        };
        loadInitial();
        window.addEventListener("notificationsUpdated", refreshCount);
        return () => window.removeEventListener("notificationsUpdated", refreshCount);
    }, []);

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>{NAVBAR.TITLE}</div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>{NAVBAR.HOME}</Link>
                <Link to="/patients" style={styles.link}>{NAVBAR.PATIENTS}</Link>
                <Link to="/reports" style={styles.link}>{NAVBAR.REPORTS}</Link>
                <Link to="/notes" style={styles.link}>Նշումներ</Link>
                <Link to="/finances" style={styles.link}>Ֆինանսներ</Link>
                <Link to="/notifications" style={styles.link}>
                    <div style={styles.notifWrapper}>
                        {NAVBAR.NOTIFICATIONS}
                        {unreadCount > 0 && (
                            <span style={styles.badge}>{unreadCount}</span>
                        )}
                    </div>
                </Link>
                <Link to="/about" style={styles.link}>{NAVBAR.ABOUT}</Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "15px 30px", background: "#1a2e4a", color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    logo: { fontSize: "20px", fontWeight: "bold" },
    links: { display: "flex", gap: "25px" },
    link: { color: "white", textDecoration: "none", fontSize: "14px", transition: "opacity 0.2s" },
    notifWrapper: { position: "relative", display: "inline-flex", alignItems: "center", gap: "6px" },
    badge: {
        background: "#ef4444", color: "white", fontSize: "11px", fontWeight: "600",
        borderRadius: "50%", width: "18px", height: "18px",
        display: "flex", alignItems: "center", justifyContent: "center",
    },
};

export default Navbar;
