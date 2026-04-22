import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { LOADING, NOTIFICATIONS } from "../constants";
import NotificationCard from "../components/NotificationCard";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const FICTIVE_NOTIFICATIONS = [
    {
        id: 9001,
        title: "Հիվանդի հետազոտություն",
        message: "Արամ Սարգսյանի արյան թեստի արդյունքները պատրաստ են",
        type: "patient",
        date: new Date().toISOString(),
        read: false,
        email: "aram.sargsyan@mail.am",
    },
    {
        id: 9002,
        title: "Ժամադրության հիշեցում",
        message: "Լուսինե Պետրոսյանի ժամադրությունը վաղը ժամը 10:00-ին է",
        type: "appointment",
        date: new Date().toISOString(),
        read: false,
        email: "lusine.petrosyan@mail.am",
    },
    {
        id: 9003,
        title: "Դեղատոմսի թարմացում",
        message: "Գայանե Հակոբյանի դեղատոմսի ժամկետը լրանում է 3 օրից",
        type: "prescription",
        date: new Date().toISOString(),
        read: false,
        email: "gayane.hakobyan@mail.am",
    },
];

const dispatchUpdate = (notifications) => {
    const unread = notifications.filter(n => !n.read).length;
    localStorage.setItem("unreadCount", unread);
    window.dispatchEvent(new Event("notificationsUpdated"));
};

const autoRefreshOld = (notifications) => {
    const now = Date.now();
    return notifications.map(n => {
        const age = now - new Date(n.date).getTime();
        if (age > THIRTY_DAYS_MS) {
            return { ...n, date: new Date().toISOString(), read: false };
        }
        return n;
    });
};

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [emailModal, setEmailModal] = useState(null);
    const [emailForm, setEmailForm] = useState({ to: "", subject: "", body: "" });
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => { loadNotifications(); }, []);

    useEffect(() => {
        if (notifications.length > 0) {
            dispatchUpdate(notifications);
        }
    }, [notifications]);

    const loadNotifications = async () => {
        const response = await api.getNotifications();
        let data = [];
        if (response.success) {
            data = response.data.map(item => ({ ...item, read: false }));
        }
        const merged = [...FICTIVE_NOTIFICATIONS, ...data];
        const refreshed = autoRefreshOld(merged);
        setNotifications(refreshed);
        setLoading(false);
    };

    const markAllRead = () => {
        setNotifications(prev => {
            const updated = prev.map(item => ({ ...item, read: true }));
            dispatchUpdate(updated);
            return updated;
        });
    };

    const handleDelete = (id) => {
        setNotifications(prev => {
            const updated = prev.filter(item => item.id !== id);
            dispatchUpdate(updated);
            return updated;
        });
        setConfirmDeleteId(null);
    };

    const handleRead = (id) => {
        setNotifications(prev => {
            const updated = prev.map(item =>
                item.id === id ? { ...item, read: true } : item
            );
            dispatchUpdate(updated);
            return updated;
        });
    };

    const openEmailModal = (item) => {
        setEmailForm({
            to: item.email || "",
            subject: item.title || "",
            body: "",
        });
        setEmailModal(item);
        setEmailSent(false);
    };

    const handleSendEmail = () => {
        if (!emailForm.to || !emailForm.body) return;
        // Մոկ ուղարկում — իրական պրոյեկտում կփոխարինի API կանչով
        console.log("📧 Ուղարկվեց՝", emailForm);
        setEmailSent(true);
        setTimeout(() => {
            setEmailModal(null);
            setEmailSent(false);
        }, 1500);
    };

    const filtered = notifications.filter(item => {
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
                    {["all", "unread", "read"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={filter === f ? styles.filterBtnActive : styles.filterBtn}
                        >
                            {f === "all" ? "Բոլորը" : f === "unread" ? "Չկարդացած" : "Կարդացած"}
                        </button>
                    ))}
                </div>

                {/* DELETE CONFIRM MODAL */}
                {confirmDeleteId && (
                    <div style={styles.modalOverlay} onClick={() => setConfirmDeleteId(null)}>
                        <div style={styles.confirmModal} onClick={e => e.stopPropagation()}>
                            <h3 style={styles.confirmTitle}>Ջնջե՞լ ծանուցումը</h3>
                            <p style={styles.confirmText}>Այս ծանուցումը կհեռացվի ցուցակից։ Շարունակե՞լ։</p>
                            <div style={styles.confirmBtns}>
                                <button style={styles.cancelBtn} onClick={() => setConfirmDeleteId(null)}>Չեղարկել</button>
                                <button style={styles.deleteBtn} onClick={() => handleDelete(confirmDeleteId)}>Ջնջել</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* EMAIL MODAL */}
                {emailModal && (
                    <div style={styles.modalOverlay} onClick={() => setEmailModal(null)}>
                        <div style={styles.confirmModal} onClick={e => e.stopPropagation()}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.confirmTitle}>📧 Նամակ ուղարկել</h3>
                                <button style={styles.closeBtn} onClick={() => setEmailModal(null)}>✕</button>
                            </div>
                            {emailSent ? (
                                <div style={styles.successMsg}>✅ Նամակը հաջողությամբ ուղարկվեց</div>
                            ) : (
                                <>
                                    <input
                                        style={styles.input}
                                        placeholder="Ուղարկել՝ (էլ. փոստ)"
                                        value={emailForm.to}
                                        onChange={e => setEmailForm({ ...emailForm, to: e.target.value })}
                                    />
                                    <input
                                        style={styles.input}
                                        placeholder="Թեմա"
                                        value={emailForm.subject}
                                        onChange={e => setEmailForm({ ...emailForm, subject: e.target.value })}
                                    />
                                    <textarea
                                        style={styles.textarea}
                                        placeholder="Նամակի բովանդակություն"
                                        value={emailForm.body}
                                        onChange={e => setEmailForm({ ...emailForm, body: e.target.value })}
                                    />
                                    <div style={styles.confirmBtns}>
                                        <button style={styles.cancelBtn} onClick={() => setEmailModal(null)}>Չեղարկել</button>
                                        <button
                                            style={!emailForm.to || !emailForm.body ? styles.sendBtnDisabled : styles.sendBtn}
                                            disabled={!emailForm.to || !emailForm.body}
                                            onClick={handleSendEmail}
                                        >
                                            📧 Ուղարկել
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div style={styles.list}>
                    {filtered.length ? (
                        filtered.map(item => (
                            <NotificationCard
                                key={item.id}
                                item={item}
                                onDelete={() => setConfirmDeleteId(item.id)}
                                onRead={handleRead}
                                onEmail={() => openEmailModal(item)}
                            />
                        ))
                    ) : (
                        <p style={{ color: "#9ca3af", fontSize: "14px" }}>Ծանուցումներ չկան</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: "900px", margin: "0 auto", padding: "40px 20px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    title: { fontSize: "28px", fontWeight: "600" },
    markAllBtn: { padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
    filters: { display: "flex", gap: "10px", marginBottom: "20px" },
    filterBtn: { padding: "7px 16px", borderRadius: "8px", border: "1px solid #d1d5db", background: "white", cursor: "pointer", fontSize: "14px", color: "#6b7280" },
    filterBtnActive: { padding: "7px 16px", borderRadius: "8px", border: "1px solid #2563eb", background: "#2563eb", cursor: "pointer", fontSize: "14px", color: "white" },
    list: { display: "flex", flexDirection: "column", gap: "15px" },
    loading: { textAlign: "center", padding: "60px" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    confirmModal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    confirmTitle: { fontSize: "18px", fontWeight: "600", color: "#1a2e4a", margin: 0 },
    confirmText: { fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: "1.5" },
    confirmBtns: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "4px" },
    cancelBtn: { padding: "8px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    deleteBtn: { padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    textarea: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", minHeight: "100px", resize: "vertical" },
    sendBtn: { padding: "9px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
    sendBtnDisabled: { padding: "9px 18px", background: "#d1d5db", color: "white", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "600" },
    successMsg: { textAlign: "center", fontSize: "15px", color: "#16a34a", fontWeight: "500", padding: "12px 0" },
};

export default Notification;
