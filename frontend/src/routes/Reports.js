import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Report from "../components/Report";
import { REPORTS, LOADING } from "../constants";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [disabled, setDisabled] = useState(true);

    useEffect(() => { loadReports(); }, []);

    useEffect(() => {
        setDisabled(!formData.title || !formData.description);
    }, [formData]);

    const loadReports = async () => {
        const response = await api.getReports();
        if (response.success) setReports(response.data);
        setLoading(false);
    };

    const addReport = async () => {
        const res = await api.addReport(formData);
        if (res.success) {
            setReports([...reports, res.data]);
            setShowModal(false);
            setFormData({ title: "", description: "" });
        }
    };

    const handleDelete = (id) => {
        setReports((prev) => prev.filter((r) => r.id !== id));
    };

    const filteredReports = reports
        .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
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
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>{REPORTS.TITLE}</h1>
                        <p style={styles.subtitle}>{REPORTS.TOTAL_REPORTS(reports.length)}</p>
                    </div>
                    <button style={styles.addBtn} onClick={() => setShowModal(true)}>
                        + Ավելացնել հաշվետվություն
                    </button>
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

                <div style={styles.reportsList}>
                    {filteredReports.length ? (
                        filteredReports.map((report) => (
                            <Report key={report.id} report={report} onDelete={handleDelete} />
                        ))
                    ) : (
                        <p>{REPORTS.EMPTY_REPORTS}</p>
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
    controls: { display: "flex", gap: "12px", marginBottom: "24px", alignItems: "center" },
    search: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", width: "280px" },
    sortGroup: { display: "flex", alignItems: "center", gap: "8px" },
    sortLabel: { fontSize: "13px", color: "#6b7280", fontWeight: "500" },
    select: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
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
};

export default Reports;
