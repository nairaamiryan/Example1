import React, { useState } from "react";

const InsuranceCheck = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        patientName: "", insuranceNumber: "", company: "", date: ""
    });
    const [result, setResult] = useState(null);
    const [nameError, setNameError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setResult(null);
    };

    const handlePatientName = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Zաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ\u0531-\u0587\s]*$/i.test(value)) {
            setFormData({ ...formData, patientName: value });
            setNameError(false);
            setResult(null);
        } else {
            setNameError(true);
        }
    };

    const canCheck = formData.patientName && formData.insuranceNumber && formData.date;

    const handleCheck = () => {
        setResult({ valid: true, coverage: "80%", expiry: "2025-12-31" });
    };

    const handleSave = () => {
        onSave({
            title: `🛡️ ${formData.patientName} — Ապահովագրություն`,
            description: `${formData.company ? formData.company + " • " : ""}Ծածկույթ՝ ${result.coverage} • Ժամկետ՝ ${result.expiry}`,
            amount: null,
            date: formData.date,
            type: "expense",
        });
        onClose();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>🛡️ Ապահովագրություն ստուգել</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <div>
                    <input
                        style={{ ...styles.input, borderColor: nameError ? "#ef4444" : "#d1d5db" }}
                        type="text"
                        name="patientName"
                        placeholder="Հիվանդի անուն"
                        value={formData.patientName}
                        onChange={handlePatientName}
                    />
                    {nameError && (
                        <p style={styles.errorText}>⚠ Անունը կարող է պարունակել միայն տառեր</p>
                    )}
                </div>
                <input
                    style={styles.input}
                    type="text"
                    name="insuranceNumber"
                    placeholder="Ապահովագրության համար"
                    value={formData.insuranceNumber}
                    onChange={handleChange}
                />
                <input
                    style={styles.input}
                    type="text"
                    name="company"
                    placeholder="Ապահովագրական ընկերություն (կամընտիր)"
                    value={formData.company}
                    onChange={handleChange}
                />
                <input
                    style={styles.input}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
                <button
                    style={!canCheck ? styles.checkBtnDisabled : styles.checkBtn}
                    disabled={!canCheck}
                    onClick={handleCheck}
                >
                    Ստուգել
                </button>
                {result && (
                    <div style={{
                        ...styles.result,
                        background: result.valid ? "#f0fdf4" : "#fef2f2",
                        borderColor: result.valid ? "#16a34a" : "#dc2626"
                    }}>
                        <div style={{ color: result.valid ? "#16a34a" : "#dc2626", fontWeight: "600" }}>
                            {result.valid ? "✓ Վավեր է" : "✗ Վավեր չէ"}
                        </div>
                        {result.valid && (
                            <>
                                <div style={styles.resultRow}>Ծածկույթ՝ {result.coverage}</div>
                                <div style={styles.resultRow}>Գործողության ժամկետ՝ {result.expiry}</div>
                            </>
                        )}
                        <div style={styles.resultFooter}>
                            <button style={styles.cancelBtn} onClick={onClose}>Չեղարկել</button>
                            <button style={styles.saveBtn} onClick={handleSave}>Պահպանել</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "450px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "18px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    errorText: { margin: "4px 0 0 2px", fontSize: "12px", color: "#ef4444" },
    checkBtn: { padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    checkBtnDisabled: { padding: "10px", backgroundColor: "#d1d5db", color: "#fff", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "500" },
    result: { padding: "14px", borderRadius: "8px", border: "1px solid", display: "flex", flexDirection: "column", gap: "8px" },
    resultRow: { fontSize: "14px", color: "#374151" },
    resultFooter: { display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "4px" },
    cancelBtn: { padding: "9px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    saveBtn: { padding: "9px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
};

export default InsuranceCheck;
