import React, { useState } from "react";

const InsuranceCheck = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({ patientName: "", insuranceNumber: "", company: "" });
    const [disabled, setDisabled] = useState(true);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const updated = { ...formData, [e.target.name]: e.target.value };
        setFormData(updated);
        setDisabled(!updated.patientName || !updated.insuranceNumber);
        setResult(null);
    };

    const handleCheck = () => {
        // Mock ստուգում
        setResult({ valid: true, coverage: "80%", expiry: "2025-12-31" });
    };

    const handleSave = () => {
        onSave && onSave({ ...formData, result, id: Date.now(), date: new Date().toISOString() });
        onClose && onClose();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>Ապահովագրություն ստուգել</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <input style={styles.input} type="text" name="patientName" placeholder="Հիվանդի անուն" value={formData.patientName} onChange={handleChange} />
                <input style={styles.input} type="text" name="insuranceNumber" placeholder="Ապահովագրության համար" value={formData.insuranceNumber} onChange={handleChange} />
                <input style={styles.input} type="text" name="company" placeholder="Ապահովագրական ընկերություն" value={formData.company} onChange={handleChange} />
                <button style={disabled ? styles.submitBtnDisabled : styles.checkBtn} disabled={disabled} onClick={handleCheck}>
                    Ստուգել
                </button>
                {result && (
                    <div style={{ ...styles.result, background: result.valid ? "#f0fdf4" : "#fef2f2", borderColor: result.valid ? "#16a34a" : "#dc2626" }}>
                        <div style={{ color: result.valid ? "#16a34a" : "#dc2626", fontWeight: "600" }}>
                            {result.valid ? "✓ Վավեր է" : "✗ Վավեր չէ"}
                        </div>
                        {result.valid && (
                            <>
                                <div style={styles.resultRow}>Ծածկույթ։ {result.coverage}</div>
                                <div style={styles.resultRow}>Գործողության ժամկետ։ {result.expiry}</div>
                            </>
                        )}
                        <button style={styles.submitBtn} onClick={handleSave}>Պահպանել</button>
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
    modalTitle: { fontSize: "20px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    checkBtn: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    result: { padding: "12px", borderRadius: "8px", border: "1px solid", display: "flex", flexDirection: "column", gap: "6px" },
    resultRow: { fontSize: "14px", color: "#374151" },
    submitBtn: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    submitBtnDisabled: { marginTop: "6px", padding: "10px", backgroundColor: "#ccc", color: "#fff", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "500" },
};

export default InsuranceCheck;
