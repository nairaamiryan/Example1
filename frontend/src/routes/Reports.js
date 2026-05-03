import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Report from "../components/Report";
import { REPORTS, LOADING } from "../constants";

const StatCard = ({ value, label, color }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            style={{
                background: "white",
                borderRadius: "10px",
                padding: "14px 20px",
                flex: 1,
                textAlign: "center",
                cursor: "default",
                boxShadow: hovered ? "0 8px 24px rgba(37,99,235,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{ fontSize: "24px", fontWeight: "700", color: color || "#2563eb" }}>{value}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{label}</div>
        </div>
    );
};

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", date: "" });
    const [disabled, setDisabled] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [showArchived, setShowArchived] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => { loadReports(); }, []);

    useEffect(() => {
        setDisabled(!formData.title || !formData.description || !formData.date);
    }, [formData]);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const loadReports = async () => {
        const response = await api.getReports();
        if (response.success) {
            setReports(response.data.map(r => ({
                ...r,
                pinned: r.pinned ?? false,
                archived: r.archived ?? false,
                locked: r.locked ?? false,
                read: r.read ?? false,
                accessLog: [],
            })));
        }
        setLoading(false);
    };

    const addReport = async () => {
        const res = await api.addReport(formData);
        if (res.success) {
            setReports([...reports, {
                ...res.data,
                date: formData.date,
                pinned: false, archived: false, locked: false, read: false, accessLog: [],
            }]);
            setShowModal(false);
            setFormData({ title: "", description: "", date: "" });
            showToast("Հաշվետվությունը հաջողությամբ ավելացվեց");
        }
    };

    const handleDelete = async (id) => {
        const report = reports.find(r => r.id === id);
        if (report?.locked) return;
        const response = await api.deleteReport(id);
        if (response.success) {
            setReports((prev) => prev.filter((r) => r.id !== id));
            showToast("Հաշվետվությունը ջնջվեց", "error");
        }
        setConfirmDeleteId(null);
    };

    const handleEdit = async (id, updatedData) => {
        const response = await api.updateReport(id, updatedData);
        if (response.success) {
            setReports(prev => prev.map(r =>
                r.id === id ? { ...r, ...updatedData } : r
            ));
            showToast("Փոփոխությունները պահպանվեցին");
        }
    };

    const handleDuplicate = async (id) => {
        const original = reports.find(r => r.id === id);
        if (!original) return;
        const res = await api.addReport({
            title: `${original.title} (պատճեն)`,
            description: original.description,
            date: new Date().toISOString().split("T")[0],
        });
        if (res.success) {
            setReports(prev => [...prev, {
                ...res.data,
                pinned: false, archived: false, locked: false, read: false, accessLog: [],
            }]);
            showToast("Հաշվետվությունը կրկնօրինակվեց");
        }
    };

    const handlePin = async (id) => {
        const report = reports.find(r => r.id === id);
        await api.updateReport(id, { pinned: !report.pinned });
        setReports(prev => prev.map(r =>
            r.id === id ? { ...r, pinned: !r.pinned } : r
        ));
    };

    const handleArchive = async (id) => {
        const report = reports.find(r => r.id === id);
        await api.updateReport(id, { archived: !report.archived });
        setReports(prev => prev.map(r =>
            r.id === id ? { ...r, archived: !r.archived } : r
        ));
        showToast(report?.archived ? "Հանվեց արխիվից" : "Տեղափոխվեց արխիվ");
    };

    const handleLock = async (id) => {
        const report = reports.find(r => r.id === id);
        await api.updateReport(id, { locked: !report.locked });
        setReports(prev => prev.map(r =>
            r.id === id ? { ...r, locked: !r.locked } : r
        ));
        showToast(report?.locked ? "Ապակողպվեց" : "Կողպված է");
    };

    const handleMarkRead = async (id) => {
        await api.updateReport(id, { read: true });
        setReports(prev => prev.map(r =>
            r.id === id ? {
                ...r,
                read: true,
                accessLog: [
                    ...(r.accessLog || []),
                    { user: "Դուք", time: new Date().toLocaleString("hy-AM") }
                ]
            } : r
        ));
    };

    const handleShare = (id, recipient) => {
        showToast(`Հաշվետվությունը ուղարկվեց ${recipient}-ին`);
    };

    const archivedCount = reports.filter(r => r.archived).length;
    const unreadCount = reports.filter(r => !r.read && !r.archived).length;

    const filteredReports = reports
        .filter(r => showArchived ? r.archived : !r.archived)
        .filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            if (sortBy === "name") return a.title.localeCompare(b.title);
            if (sortBy === "date") return new Date(b.date) - new Date(a.date);
            return 0;
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

                {toast && (
                    <div style={{
                        ...styles.toast,
                        background: toast.type === "error" ? "#ef4444" : "#22c55e",
                    }}>
                        {toast.message}
                    </div>
                )}

                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>{REPORTS.TITLE}</h1>
                        <p style={styles.subtitle}>{REPORTS.TOTAL_REPORTS(reports.length)}</p>
                    </div>
                    <button style={styles.addBtn} onClick={() => setShowModal(true)}>
                        + Ավելացնել հաշվետվություն
                    </button>
                </div>

                <div style={styles.statsRow}>
                    <StatCard value={reports.filter(r => !r.archived).length} label="Ակտիվ" color="#2563eb" />
                    <StatCard value={unreadCount} label="Չընթերցված" color="#f59e0b" />
                    <StatCard value={reports.filter(r => r.pinned).length} label="Ամրացված" color="#8b5cf6" />
                    <StatCard value={archivedCount} label="Արխիվ" color="#6b7280" />
                </div>

                <div style={styles.controls}>
                    <input
                        type="text"
                        placeholder="Որոնել հաշվետվություն..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.search}
                    />
                    <div style={styles.sortGroup}>
                        <span style={styles.sortLabel}>Դասակարգել՝</span>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
                            <option value="date">Ըստ ամսաթվի</option>
                            <option value="name">Ըստ անվան</option>
                        </select>
                    </div>
                    {archivedCount > 0 && (
                        <button
                            style={{ ...styles.archiveToggle, background: showArchived ? "#6b7280" : "#f3f4f6", color: showArchived ? "white" : "#374151" }}
                            onClick={() => setShowArchived(!showArchived)}
                        >
                            📦 {showArchived ? "Ակտիվ" : `Արխիվ (${archivedCount})`}
                        </button>
                    )}
                </div>

                {showModal && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modalContent}>
                            <div style={styles.modalHeader}>
                                <h2 style={styles.modalTitle}>Նոր հաշվետվություն</h2>
                                <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
                            </div>
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Վերնագիր"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <textarea
                                style={styles.textarea}
                                placeholder="Նկարագրություն"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <input
                                style={styles.input}
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            <button
                                style={disabled ? styles.submitBtnDisabled : styles.submitBtn}
                                disabled={disabled}
                                onClick={addReport}
                            >
                                Ավելացնել
                            </button>
                        </div>
                    </div>
                )}

                {confirmDeleteId && (
                    <div style={styles.modalOverlay} onClick={() => setConfirmDeleteId(null)}>
                        <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
                            <h3 style={styles.confirmTitle}>Ջնջե՞լ հաշվետվությունը</h3>
                            <p style={styles.confirmText}>Այս հաշվետվությունը կհեռացվի ցուցակից և հնարավոր չի լինի վերականգնել։ Շարունակե՞լ։</p>
                            <div style={styles.confirmBtns}>
                                <button style={styles.cancelBtn} onClick={() => setConfirmDeleteId(null)}>Չեղարկել</button>
                                <button style={styles.deleteBtn} onClick={() => handleDelete(confirmDeleteId)}>Ջնջել</button>
                            </div>
                        </div>
                    </div>
                )}

                <div style={styles.reportsList}>
                    {filteredReports.length ? (
                        filteredReports.map((report) => (
                            <Report
                                key={report.id}
                                report={report}
                                onDelete={() => setConfirmDeleteId(report.id)}
                                onPin={handlePin}
                                onArchive={handleArchive}
                                onLock={handleLock}
                                onDuplicate={handleDuplicate}
                                onEdit={handleEdit}
                                onShare={handleShare}
                                onMarkRead={handleMarkRead}
                            />
                        ))
                    ) : (
                        <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                            {showArchived ? "Արխիվը դատարկ է" : REPORTS.EMPTY_REPORTS}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    title: { fontSize: "32px", fontWeight: "600", color: "#1a2e4a", marginBottom: "5px" },
    subtitle: { fontSize: "14px", color: "#6b7280" },
    addBtn: { padding: "10px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
    statsRow: { display: "flex", gap: "12px", marginBottom: "20px" },
    controls: { display: "flex", gap: "12px", marginBottom: "24px", alignItems: "center" },
    search: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", width: "280px" },
    sortGroup: { display: "flex", alignItems: "center", gap: "8px" },
    sortLabel: { fontSize: "13px", color: "#6b7280", fontWeight: "500" },
    select: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
    archiveToggle: { padding: "9px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "13px", cursor: "pointer", fontWeight: "500" },
    reportsList: { maxWidth: "800px" },
    loading: { textAlign: "center", padding: "60px 20px", fontSize: "16px", color: "#6b7280" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modalContent: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "20px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    textarea: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", minHeight: "100px", resize: "vertical" },
    submitBtn: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    submitBtnDisabled: { marginTop: "6px", padding: "10px", backgroundColor: "#ccc", color: "#fff", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "500" },
    confirmModal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "360px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "16px" },
    confirmTitle: { fontSize: "18px", fontWeight: "600", color: "#1a2e4a", margin: 0 },
    confirmText: { fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: "1.5" },
    confirmBtns: { display: "flex", gap: "10px", justifyContent: "flex-end" },
    cancelBtn: { padding: "8px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    deleteBtn: { padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    toast: { position: "fixed", top: "20px", right: "20px", color: "white", padding: "12px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: "500", zIndex: 2000, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" },
};

export default Reports;
