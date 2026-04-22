import React, { useState } from "react";

const InvoiceCreate = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        patientName: "", service: "", amount: "", date: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const disabled = !formData.patientName || !formData.service || !formData.amount || !formData.date;

    const handleSave = () => {
        onSave({
            title: `🧾 ${formData.service}`,
            description: `Հիվանդ՝ ${formData.patientName}`,
            amount: formData.amount,
            date: formData.date,
            type: "income",
        });
        onClose();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>🧾 Հաշիվ-ապրանքագիր ստեղծել</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <input
                    style={styles.input}
                    type="text"
                    name="patientName"
                    placeholder="Հիվանդի անուն"
                    value={formData.patientName}
                    onChange={handleChange}
                />
                <input
                    style={styles.input}
                    type="text"
                    name="service"
                    placeholder="Ծառայության անվանում"
                    value={formData.service}
                    onChange={handleChange}
                />
                <input
                    style={styles.input}
                    type="number"
                    name="amount"
                    placeholder="Գումար (֏)"
                    value={formData.amount}
                    onChange={handleChange}
                />
                <input
                    style={styles.input}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
                <div style={styles.footer}>
                    <button style={styles.cancelBtn} onClick={onClose}>Չեղարկել</button>
                    <button
                        style={disabled ? styles.saveBtnDisabled : styles.saveBtn}
                        disabled={disabled}
                        onClick={handleSave}
                    >
                        Ստեղծել
                    </button>
                </div>
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
    footer: { display: "flex", gap: "8px", justifyContent: "flex-end" },
    cancelBtn: { padding: "9px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    saveBtn: { padding: "9px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
    saveBtnDisabled: { padding: "9px 18px", background: "#d1d5db", color: "white", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "600" },
};

export default InvoiceCreate;
