import React, { useState } from "react";

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("hy-AM", {
        year: "numeric", month: "long", day: "numeric"
    });
};

const ExportReport = ({ onClose, items = [] }) => {
    const [formData, setFormData] = useState({ period: "month", type: "all", format: "pdf" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleExport = () => {
        const filtered = items.filter((i) => {
            if (formData.type === "income") return i.type === "income";
            if (formData.type === "expense") return i.type === "expense";
            return true;
        });

        const rows = filtered.map((i) => `
            <tr>
                <td>${i.title}</td>
                <td>${i.description || ""}</td>
                <td style="color:${i.type === "income" ? "#16a34a" : "#dc2626"}; font-weight:600;">
                    ${i.amount ? (i.type === "income" ? "+" : "-") + Number(i.amount).toLocaleString() + "֏" : "—"}
                </td>
                <td>${formatDate(i.date)}</td>
            </tr>
        `).join("");

        const totalIncome = filtered.filter(i => i.type === "income" && i.amount).reduce((s, i) => s + Number(i.amount), 0);
        const totalExpense = filtered.filter(i => i.type === "expense" && i.amount).reduce((s, i) => s + Number(i.amount), 0);

        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Ֆինանսական հաշվետվություն</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #1a2e4a; }
                    h1 { font-size: 22px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background: #2563eb; color: white; padding: 10px; text-align: left; }
                    td { padding: 9px 10px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
                    .summary { margin-top: 20px; font-size: 14px; }
                    .income { color: #16a34a; font-weight: 600; }
                    .expense { color: #dc2626; font-weight: 600; }
                </style>
            </head>
            <body>
                <h1>Ֆինանսական հաշվետվություն</h1>
                <p>Ստեղծման ամսաթիվ՝ ${new Date().toLocaleDateString("hy-AM")}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Վերնագիր</th>
                            <th>Նկարագրություն</th>
                            <th>Գումար</th>
                            <th>Ամսաթիվ</th>
                        </tr>
                    </thead>
                    <tbody>${rows || "<tr><td colspan='4'>Գրառումներ չկան</td></tr>"}</tbody>
                </table>
                <div class="summary">
                    <p>Ընդհանուր եկամուտ՝ <span class="income">+${totalIncome.toLocaleString()}֏</span></p>
                    <p>Ընդհանուր ծախս՝ <span class="expense">-${totalExpense.toLocaleString()}֏</span></p>
                    <p>Մնացորդ՝ <strong>${(totalIncome - totalExpense).toLocaleString()}֏</strong></p>
                </div>
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
                    <h2 style={styles.modalTitle}>⬇ Հաշվետվություն արտահանել</h2>
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
                <div style={styles.footer}>
                    <button style={styles.cancelBtn} onClick={onClose}>Չեղարկել</button>
                    <button style={styles.submitBtn} onClick={handleExport}>⬇ Արտահանել</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "18px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    label: { fontSize: "13px", fontWeight: "500", color: "#374151" },
    select: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
    footer: { display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "4px" },
    cancelBtn: { padding: "9px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    submitBtn: { padding: "9px 18px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
};

export default ExportReport;
