import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NAVBAR } from "../constants";
import api from "../services/api";

const FICTIVE_UNREAD_COUNT = 3;

const Navbar = () => {
    const { logout, user } = useAuth0();
    const [unreadCount, setUnreadCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

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
        return () =>
            window.removeEventListener("notificationsUpdated", refreshCount);
    }, []);

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>{NAVBAR.TITLE}</div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>
                    {NAVBAR.HOME}
                </Link>
                <Link to="/patients" style={styles.link}>
                    {NAVBAR.PATIENTS}
                </Link>
                <Link to="/reports" style={styles.link}>
                    {NAVBAR.REPORTS}
                </Link>
                <Link to="/notes" style={styles.link}>
                    Նշումներ
                </Link>
                <Link to="/finances" style={styles.link}>
                    Ֆինանսներ
                </Link>
                <Link to="/notifications" style={styles.link}>
                    <div style={styles.notifWrapper}>
                        {NAVBAR.NOTIFICATIONS}
                        {unreadCount > 0 && (
                            <span style={styles.badge}>{unreadCount}</span>
                        )}
                    </div>
                </Link>
                <Link to="/about" style={styles.link}>
                    {NAVBAR.ABOUT}
                </Link>
                {user && (
                    <div style={styles.avatarWrapper}>
                        <div
                            style={styles.avatar}
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            {user.email.charAt(0).toUpperCase()}
                        </div>
                        {menuOpen && (
                            <div style={styles.dropdown}>
                                <div style={styles.dropdownEmail}>
                                    {user.email}
                                </div>
                                <button
                                    style={styles.logoutBtn}
                                    onClick={() =>
                                        logout({
                                            returnTo: window.location.origin,
                                        })
                                    }
                                >
                                    Դուրս գալ
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "17px 30px",
        background: "#1a2e4a",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    logo: { fontSize: "20px", fontWeight: "bold" },
    links: { display: "flex", gap: "25px" },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "14px",
        transition: "opacity 0.2s",
        paddingTop: "3px",
    },
    notifWrapper: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
    },
    badge: {
        background: "#ef4444",
        color: "white",
        fontSize: "11px",
        fontWeight: "600",
        borderRadius: "50%",
        width: "18px",
        height: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarWrapper: { position: "relative" },
    avatar: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        background: "#3b82f6",
        color: "white",
        fontWeight: "bold",
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
    },
    dropdown: {
        position: "absolute",
        right: 0,
        top: "45px",
        background: "white",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "180px",
        zIndex: 1000,
    },
    dropdownEmail: {
        color: "#4a5568",
        fontSize: "13px",
        marginBottom: "8px",
        paddingBottom: "8px",
        borderBottom: "1px solid #e2e8f0",
    },
    logoutBtn: {
        background: "transparent",
        border: "1px solid #ef4444",
        color: "#ef4444",
        padding: "5px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "13px",
        width: "100%",
    },
};

export default Navbar;
