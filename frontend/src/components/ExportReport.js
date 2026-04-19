import React, { useState } from "react";

const ExportReport = ({ onClose }) => {
    const [formData, setFormData] = useState({ period: "month", type: "all", format: "pdf" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleExport = () => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Ֆինանսական հաշվետվություն</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #1a2e4a; }
                    h1 { font-size: 22px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                    .row { margin: 12px 0; font-size: 14px; }
                    .label { font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>Ֆինանսական հաշվետվություն</h1>
                <div class="row"><span class="label">Ժամանակաշրջան։</span> ${formData.period === "month" ? "Ամիս" : formData.period === "quarter" ? "Եռամսյակ" : "Տարի"}</div>
                <div class="row"><span class="label">Տեսակ։</span> ${formData.type === "all" ? "Բոլորը" : formData.type === "income" ? "Եկամուտ" : "Ծախս"}</div>
                <div class="row"><span class="label">Ձևաչափ։</span> ${formData.format.toUpperCase()}</div>
                <div class="row"><span class="label">Ստեղծման ամսաթիվ։</span> ${new Date().toLocaleDateString("hy-AM")}</div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { printWindow.print(); printWindow.close(); }, 300);
        onClose && onClose();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.modalTitle}>Հաշվետվություն արտահանել</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <label style={styles.label}>Ժամանակաշրջան</label>
                <select name="period" value={formData.period} onChange={handleChange} style={styles.select}>
                    <option value="month">Ամիս</option>
                    <option value="quarter">Եռամսյակ</option>
                    <option value="year">Տարի</option>
                </select>
                <label style={styles.label}>Տեսակ</label>
                <select name="type" value={formData.type} onChange={handleChange} style={styles.select}>
                    <option value="all">Բոլորը</option>
                    <option value="income">Եկամուտ</option>
                    <option value="expense">Ծախս</option>
                </select>
                <label style={styles.label}>Ձևաչափ</label>
                <select name="format" value={formData.format} onChange={handleChange} style={styles.select}>
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                </select>
                <button style={styles.submitBtn} onClick={handleExport}>
                    ⬇ Արտահանել
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
    label: { fontSize: "13px", fontWeight: "500", color: "#374151" },
    select: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
    submitBtn: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
};

export default ExportReport;
