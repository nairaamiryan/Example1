import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NAVBAR } from "../constants";
import api from "../services/api";

const FICTIVE_UNREAD_COUNT = 3;

const Navbar = () => {
    const { user, logout } = useAuth0();
    const [unreadCount, setUnreadCount] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Dropdown-ը փակել outside click-ից
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                const total = response.data.length + FICTIVE_UNREAD_COUNT;
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

            {/* User avatar + dropdown */}
            <div style={styles.userSection} ref={dropdownRef}>
                <button
                    style={styles.avatarBtn}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <img
                        src={user.picture}
                        alt={user.name}
                        style={styles.avatar}
                    />
                    <span style={styles.userName}>{user.name}</span>
                    <span style={styles.chevron}>{dropdownOpen ? "▲" : "▼"}</span>
                </button>

                {dropdownOpen && (
                    <div style={styles.dropdown}>
                        <div style={styles.dropdownHeader}>
                            <img src={user.picture} alt={user.name} style={styles.dropdownAvatar} />
                            <div>
                                <div style={styles.dropdownName}>{user.name}</div>
                                <div style={styles.dropdownEmail}>{user.email}</div>
                            </div>
                        </div>
                        <hr style={styles.divider} />
                        <button
                            style={styles.logoutBtn}
                            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                        >
                            🚪 Ելք
                        </button>
                    </div>
                )}
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
    // User section
    userSection: { position: "relative" },
    avatarBtn: {
        display: "flex", alignItems: "center", gap: "8px",
        background: "transparent", border: "none", cursor: "pointer", color: "white",
        padding: "4px 8px", borderRadius: "8px",
    },
    avatar: { width: "36px", height: "36px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)" },
    userName: { fontSize: "14px", fontWeight: "500" },
    chevron: { fontSize: "10px", opacity: "0.7" },
    // Dropdown
    dropdown: {
        position: "absolute", top: "calc(100% + 10px)", right: "0",
        background: "white", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        minWidth: "220px", zIndex: 1000, overflow: "hidden",
    },
    dropdownHeader: { display: "flex", alignItems: "center", gap: "12px", padding: "16px" },
    dropdownAvatar: { width: "44px", height: "44px", borderRadius: "50%" },
    dropdownName: { fontSize: "14px", fontWeight: "600", color: "#1a2e4a" },
    dropdownEmail: { fontSize: "12px", color: "#64748b", marginTop: "2px" },
    divider: { border: "none", borderTop: "1px solid #f1f5f9", margin: "0" },
    logoutBtn: {
        width: "100%", padding: "12px 16px", background: "transparent",
        border: "none", textAlign: "left", cursor: "pointer",
        fontSize: "14px", color: "#ef4444", fontWeight: "500",
    },
};

export default Navbar;
