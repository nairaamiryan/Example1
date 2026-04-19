import React, { useState } from "react";

const InvoiceCreate = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({ patientName: "", service: "", amount: "", dueDate: "" });
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        const updated = { ...formData, [e.target.name]: e.target.value };
        setFormData(updated);
        setDisabled(!updated.patientName || !updated.service || !updated.amount);
    };

    const handleSave = () => {
        onSave && onSave({ ...formData, id: Date.now(), date: new Date().toISOString() });
        onClose && onClose();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>Հաշիվ-ապրանքագիր ստեղծել</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <input style={styles.input} type="text" name="patientName" placeholder="Հիվանդի անուն" value={formData.patientName} onChange={handleChange} />
                <input style={styles.input} type="text" name="service" placeholder="Ծառայության անվանում" value={formData.service} onChange={handleChange} />
                <input style={styles.input} type="number" name="amount" placeholder="Գումար (֏)" value={formData.amount} onChange={handleChange} />
                <input style={styles.input} type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
                <button style={disabled ? styles.submitBtnDisabled : styles.submitBtn} disabled={disabled} onClick={handleSave}>
                    Ստեղծել
                </button>
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
    submitBtn: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    submitBtnDisabled: { marginTop: "6px", padding: "10px", backgroundColor: "#ccc", color: "#fff", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "500" },
};

export default InvoiceCreate;
