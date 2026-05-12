import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { LOADING, NOTIFICATIONS } from "../constants";
import NotificationCard from "../components/NotificationCard";
import Footer from "../components/Footer";

const ONLY_LETTERS = /^[a-zA-Zաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ\u0531-\u0587\s]*$/i;

const dispatchUpdate = (notifications) => {
    const unread = notifications.filter(n => !n.read).length;
    localStorage.setItem("unreadCount", unread);
    window.dispatchEvent(new Event("notificationsUpdated"));
};

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailForm, setEmailForm] = useState({
        firstName: "", lastName: "", email: "", subject: "", body: ""
    });
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => { loadNotifications(); }, []);

    useEffect(() => {
        if (notifications.length > 0) {
            dispatchUpdate(notifications);
        }
    }, [notifications]);

    const loadNotifications = async () => {
        const response = await api.getNotifications();
        if (response.success) {
            const data = response.data.map(item => ({ ...item, read: item.read || false }));
            setNotifications(data);
        }
        setLoading(false);
    };

    const markAllRead = async () => {
        const unread = notifications.filter(n => !n.read);
        await Promise.all(unread.map(n => api.updateNotification(n.id, { read: true })));
        setNotifications(prev => {
            const updated = prev.map(item => ({ ...item, read: true }));
            dispatchUpdate(updated);
            return updated;
        });
    };

    const handleDelete = async (id) => {
        const response = await api.deleteNotification(id);
        if (response.success) {
            setNotifications(prev => {
                const updated = prev.filter(item => item.id !== id);
                dispatchUpdate(updated);
                return updated;
            });
        }
        setConfirmDeleteId(null);
    };

    const handleRead = async (id) => {
        await api.updateNotification(id, { read: true });
        setNotifications(prev => {
            const updated = prev.map(item =>
                item.id === id ? { ...item, read: true } : item
            );
            dispatchUpdate(updated);
            return updated;
        });
    };

    const openEmailModal = () => {
        setEmailForm({ firstName: "", lastName: "", email: "", subject: "", body: "" });
        setNameError(false);
        setSurnameError(false);
        setEmailSent(false);
        setShowEmailModal(true);
    };

    const handleFirstName = (e) => {
        const value = e.target.value;
        if (ONLY_LETTERS.test(value)) {
            setEmailForm(f => ({ ...f, firstName: value }));
            setNameError(false);
        } else {
            setNameError(true);
        }
    };

    const handleLastName = (e) => {
        const value = e.target.value;
        if (ONLY_LETTERS.test(value)) {
            setEmailForm(f => ({ ...f, lastName: value }));
            setSurnameError(false);
        } else {
            setSurnameError(true);
        }
    };

    const emailDisabled =
        !emailForm.firstName || !emailForm.lastName ||
        !emailForm.email || !emailForm.body ||
        nameError || surnameError;

    const handleSendEmail = () => {
        if (emailDisabled) return;
        console.log("📧 Ուղարկվեց՝", emailForm);
        setEmailSent(true);
        setTimeout(() => {
            setShowEmailModal(false);
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
                    <div style={styles.headerBtns}>
                        <button style={styles.emailOpenBtn} onClick={openEmailModal}>
                            📧 Նամակ ուղարկել հիվանդին
                        </button>
                        <button style={styles.markAllBtn} onClick={markAllRead}>
                            Բոլորը կարդացած նշել
                        </button>
                    </div>
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

                {confirmDeleteId && (
                    <div style={styles.modalOverlay} onClick={() => setConfirmDeleteId(null)}>
                        <div style={styles.modal} onClick={e => e.stopPropagation()}>
                            <h3 style={styles.modalTitle}>Ջնջե՞լ ծանուցումը</h3>
                            <p style={styles.modalText}>Այս ծանուցումը կհեռացվի ցուցակից։ Շարունակե՞լ։</p>
                            <div style={styles.modalBtns}>
                                <button style={styles.cancelBtn} onClick={() => setConfirmDeleteId(null)}>Չեղարկել</button>
                                <button style={styles.deleteBtn} onClick={() => handleDelete(confirmDeleteId)}>Ջնջել</button>
                            </div>
                        </div>
                    </div>
                )}

                {showEmailModal && (
                    <div style={styles.modalOverlay} onClick={() => setShowEmailModal(false)}>
                        <div style={styles.modal} onClick={e => e.stopPropagation()}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>📧 Նամակ ուղարկել հիվանդին</h3>
                                <button style={styles.closeBtn} onClick={() => setShowEmailModal(false)}>✕</button>
                            </div>
                            {emailSent ? (
                                <div style={styles.successMsg}>✅ Նամակը հաջողությամբ ուղարկվեց</div>
                            ) : (
                                <>
                                    <div>
                                        <input
                                            style={{ ...styles.input, borderColor: nameError ? "#ef4444" : "#d1d5db" }}
                                            placeholder="Հիվանդի անուն"
                                            value={emailForm.firstName}
                                            onChange={handleFirstName}
                                        />
                                        {nameError && <p style={styles.errorText}>⚠ Անունը կարող է պարունակել միայն տառեր</p>}
                                    </div>
                                    <div>
                                        <input
                                            style={{ ...styles.input, borderColor: surnameError ? "#ef4444" : "#d1d5db" }}
                                            placeholder="Հիվանդի ազգանուն"
                                            value={emailForm.lastName}
                                            onChange={handleLastName}
                                        />
                                        {surnameError && <p style={styles.errorText}>⚠ Ազգանունը կարող է պարունակել միայն տառեր</p>}
                                    </div>
                                    <input
                                        style={styles.input}
                                        placeholder="Էլ. փոստ"
                                        type="email"
                                        value={emailForm.email}
                                        onChange={e => setEmailForm(f => ({ ...f, email: e.target.value }))}
                                    />
                                    <input
                                        style={styles.input}
                                        placeholder="Թեմա (կամընտիր)"
                                        value={emailForm.subject}
                                        onChange={e => setEmailForm(f => ({ ...f, subject: e.target.value }))}
                                    />
                                    <textarea
                                        style={styles.textarea}
                                        placeholder="Նամակի բովանդակություն"
                                        value={emailForm.body}
                                        onChange={e => setEmailForm(f => ({ ...f, body: e.target.value }))}
                                    />
                                    <div style={styles.modalBtns}>
                                        <button style={styles.cancelBtn} onClick={() => setShowEmailModal(false)}>Չեղարկել</button>
                                        <button
                                            style={emailDisabled ? styles.sendBtnDisabled : styles.sendBtn}
                                            disabled={emailDisabled}
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
                            />
                        ))
                    ) : (
                        <p style={{ color: "#9ca3af", fontSize: "14px" }}>Ծանուցումներ չկան</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    container: { maxWidth: "900px", margin: "0 auto", padding: "40px 20px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" },
    headerBtns: { display: "flex", gap: "10px", flexWrap: "wrap" },
    title: { fontSize: "28px", fontWeight: "600" },
    emailOpenBtn: { padding: "8px 16px", background: "#f0f4ff", color: "#2563eb", border: "1px solid #c7d7fd", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
    markAllBtn: { padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
    filters: { display: "flex", gap: "10px", marginBottom: "20px" },
    filterBtn: { padding: "7px 16px", borderRadius: "8px", border: "1px solid #d1d5db", background: "white", cursor: "pointer", fontSize: "14px", color: "#6b7280" },
    filterBtnActive: { padding: "7px 16px", borderRadius: "8px", border: "1px solid #2563eb", background: "#2563eb", cursor: "pointer", fontSize: "14px", color: "white" },
    list: { display: "flex", flexDirection: "column", gap: "15px" },
    loading: { textAlign: "center", padding: "60px" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "18px", fontWeight: "600", color: "#1a2e4a", margin: 0 },
    modalText: { fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: "1.5" },
    modalBtns: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "4px" },
    cancelBtn: { padding: "8px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    deleteBtn: { padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    textarea: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", minHeight: "100px", resize: "vertical" },
    errorText: { margin: "4px 0 0 2px", fontSize: "12px", color: "#ef4444" },
    sendBtn: { padding: "9px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
    sendBtnDisabled: { padding: "9px 18px", background: "#d1d5db", color: "white", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "600" },
    successMsg: { textAlign: "center", fontSize: "15px", color: "#16a34a", fontWeight: "500", padding: "12px 0" },
};

export default Notification;
