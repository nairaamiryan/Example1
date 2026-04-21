import React, { useState } from "react";

const Prescription = ({ onClose, onSave }) => {
    const [form, setForm] = useState({ title: "", description: "", date: "" });

    const handleSave = () => {
        if (!form.title || !form.description || !form.date) return;
        onSave({ type: "prescription", ...form });
    };

    const disabled = !form.title || !form.description || !form.date;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>💊 Բաղադրատոմս դուրս գրել</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <input
                    style={styles.input}
                    placeholder="Դեղամիջոցի անվանում"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                    style={styles.textarea}
                    placeholder="Դոզան, ընդունման եղանակը, տևողությունը"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <input
                    style={styles.input}
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <div style={styles.footer}>
                    <button style={styles.cancelBtn} onClick={onClose}>Չեղարկել</button>
                    <button
                        style={disabled ? styles.saveBtnDisabled : styles.saveBtn}
                        disabled={disabled}
                        onClick={handleSave}
                    >
                        Պահպանել
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "440px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    title: { fontSize: "18px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    textarea: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", minHeight: "100px", resize: "vertical" },
    footer: { display: "flex", gap: "8px", justifyContent: "flex-end" },
    cancelBtn: { padding: "9px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    saveBtn: { padding: "9px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
    saveBtnDisabled: { padding: "9px 18px", background: "#d1d5db", color: "white", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "600" },
};

export default Prescription;
