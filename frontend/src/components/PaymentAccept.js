import React, { useState } from "react";

const PaymentAccept = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        patientName: "", amount: "", method: "cash", notes: "", date: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const disabled = !formData.patientName || !formData.amount || !formData.date;

    const methodLabel = { cash: "Կանխիկ", card: "Քարտ", transfer: "Փոխանցում" };

    const handleSave = () => {
        onSave({
            title: `💳 ${formData.patientName}ի վճարում`,
            description: `Եղանակ՝ ${methodLabel[formData.method]}${formData.notes ? ` • ${formData.notes}` : ""}`,
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
                    <h2 style={styles.modalTitle}>💳 Վճարում ընդունել</h2>
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
                    type="number"
                    name="amount"
                    placeholder="Գումար (֏)"
                    value={formData.amount}
                    onChange={handleChange}
                />
                <select name="method" value={formData.method} onChange={handleChange} style={styles.select}>
                    <option value="cash">Կանխիկ</option>
                    <option value="card">Քարտ</option>
                    <option value="transfer">Փոխանցում</option>
                </select>
                <input
                    style={styles.input}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
                <textarea
                    style={styles.textarea}
                    name="notes"
                    placeholder="Նշումներ (կամընտիր)"
                    value={formData.notes}
                    onChange={handleChange}
                />
                <div style={styles.footer}>
                    <button style={styles.cancelBtn} onClick={onClose}>Չեղարկել</button>
                    <button
                        style={disabled ? styles.saveBtnDisabled : styles.saveBtn}
                        disabled={disabled}
                        onClick={handleSave}
                    >
                        Ընդունել
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
    select: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
    textarea: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", minHeight: "80px", resize: "vertical" },
    footer: { display: "flex", gap: "8px", justifyContent: "flex-end" },
    cancelBtn: { padding: "9px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    saveBtn: { padding: "9px 18px", background: "#16a34a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
    saveBtnDisabled: { padding: "9px 18px", background: "#d1d5db", color: "white", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "600" },
};

export default PaymentAccept;
