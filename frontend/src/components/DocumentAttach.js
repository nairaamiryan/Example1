import React, { useState } from "react";

const DocumentAttach = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({ title: "", file: null });
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        const updated = { ...formData, title: e.target.value };
        setFormData(updated);
        setDisabled(!updated.title || !formData.file);
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        const updated = { ...formData, file };
        setFormData(updated);
        setDisabled(!formData.title || !file);
    };

    const handleSave = () => {
        onSave && onSave({ title: formData.title, fileName: formData.file?.name, id: Date.now(), date: new Date().toISOString() });
        onClose && onClose();
    };

    const handleDownload = () => {
        if (!formData.file) return;
        const url = URL.createObjectURL(formData.file);
        const a = document.createElement("a");
        a.href = url;
        a.download = formData.file.name;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>Փաստաթուղթ կցել</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Փաստաթղթի անվանում"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    style={styles.fileInput}
                    type="file"
                    onChange={handleFile}
                />
                {formData.file && (
                    <div style={styles.fileInfo}>
                        📎 {formData.file.name}
                        <button style={styles.downloadBtn} onClick={handleDownload}>⬇ Ներբեռնել</button>
                    </div>
                )}
                <button
                    style={disabled ? styles.submitBtnDisabled : styles.submitBtn}
                    disabled={disabled}
                    onClick={handleSave}
                >
                    Կցել
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
    fileInput: { padding: "8px", fontSize: "14px", cursor: "pointer" },
    fileInfo: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#f3f4f6", borderRadius: "8px", fontSize: "13px", color: "#374151" },
    downloadBtn: { background: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" },
    submitBtn: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    submitBtnDisabled: { marginTop: "6px", padding: "10px", backgroundColor: "#ccc", color: "#fff", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "500" },
};

export default DocumentAttach;
