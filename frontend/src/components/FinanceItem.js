import React, { useState } from "react";

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("hy-AM", {
        year: "numeric", month: "long", day: "numeric"
    });
};

const FinanceItem = ({ item, onDelete, onEdit }) => {
    const [hovered, setHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({
        title: item.title,
        description: item.description || "",
        amount: item.amount || "",
        type: item.type || "income",
        date: item.date || "",
    });

    const handleEditSubmit = async () => {
        if (!editData.title) return;
        await onEdit && onEdit(item.id, editData);
        setShowEdit(false);
    };

    return (
        <>
            <div
                style={{
                    ...styles.card,
                    boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
                    transform: hovered ? "translateY(-2px)" : "translateY(0)",
                    cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setShowModal(true)}
            >
                <div style={styles.content}>
                    <div style={styles.title}>{item.title}</div>
                    <div style={styles.description}>{item.description}</div>
                    <div style={styles.bottom}>
                        {item.date && <div style={styles.date}>📅 {formatDate(item.date)}</div>}
                        {item.amount && (
                            <div style={{
                                ...styles.amount,
                                color: item.type === "income" ? "#16a34a" : "#dc2626"
                            }}>
                                {item.type === "income" ? "+" : "-"}{item.amount}֏
                            </div>
                        )}
                    </div>
                </div>
                <div style={styles.btnGroup}>
                    <button
                        style={styles.editBtn}
                        onClick={(e) => { e.stopPropagation(); setShowEdit(true); }}
                    >
                        ✎
                    </button>
                    <button
                        style={styles.deleteBtn}
                        onClick={(e) => { e.stopPropagation(); onDelete && onDelete(item.id); }}
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* VIEW MODAL */}
            {showModal && (
                <div style={styles.overlay} onClick={() => setShowModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Ֆինանսական մանրամասներ</h2>
                            <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <div style={styles.detailRow}><b>Վերնագիր։</b> {item.title}</div>
                        <div style={styles.detailRow}><b>Նկարագրություն։</b> {item.description}</div>
                        {item.amount && (
                            <div style={styles.detailRow}>
                                <b>Գումար։</b>{" "}
                                <span style={{ color: item.type === "income" ? "#16a34a" : "#dc2626", fontWeight: "600" }}>
                                    {item.type === "income" ? "+" : "-"}{item.amount}֏
                                </span>
                            </div>
                        )}
                        {item.type && (
                            <div style={styles.detailRow}>
                                <b>Տեսակ։</b> {item.type === "income" ? "Եկամուտ" : "Ծախս"}
                            </div>
                        )}
                        {item.date && (
                            <div style={styles.detailRow}><b>Ամսաթիվ։</b> {formatDate(item.date)}</div>
                        )}
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEdit && (
                <div style={styles.overlay} onClick={() => setShowEdit(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Խմբագրել գրառումը</h2>
                            <button style={styles.closeBtn} onClick={() => setShowEdit(false)}>✕</button>
                        </div>
                        <input
                            style={styles.input}
                            placeholder="Վերնագիր"
                            value={editData.title}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        />
                        <textarea
                            style={styles.textarea}
                            placeholder="Նկարագրություն"
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            type="number"
                            placeholder="Գումար"
                            value={editData.amount}
                            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                        />
                        <select
                            style={styles.input}
                            value={editData.type}
                            onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                        >
                            <option value="income">Եկամուտ</option>
                            <option value="expense">Ծախս</option>
                        </select>
                        <input
                            style={styles.input}
                            type="date"
                            value={editData.date}
                            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        />
                        <div style={styles.modalFooter}>
                            <button style={styles.cancelBtnSm} onClick={() => setShowEdit(false)}>Չեղարկել</button>
                            <button style={styles.saveBtn} onClick={handleEditSubmit}>Պահպանել</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    card: {
        background: "white", padding: "15px 20px", borderRadius: "10px",
        display: "flex", alignItems: "center", gap: "15px",
        marginBottom: "12px", transition: "transform 0.2s, box-shadow 0.2s",
    },
    content: { flex: 1 },
    title: { fontSize: "15px", fontWeight: "600", color: "#1a2e4a", marginBottom: "4px" },
    description: { fontSize: "13px", color: "#6b7280", marginBottom: "4px" },
    bottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    date: { fontSize: "12px", color: "#9ca3af" },
    amount: { fontSize: "14px", fontWeight: "600" },
    btnGroup: { display: "flex", gap: "4px", flexShrink: 0 },
    editBtn: { background: "transparent", border: "none", fontSize: "16px", cursor: "pointer", color: "#9ca3af", padding: "4px 8px", borderRadius: "6px" },
    deleteBtn: { background: "transparent", border: "none", fontSize: "16px", cursor: "pointer", color: "#9ca3af", padding: "4px 8px", borderRadius: "6px" },
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "450px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "20px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    detailRow: { fontSize: "15px", color: "#374151", padding: "8px 0", borderBottom: "1px solid #f3f4f6" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    textarea: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", minHeight: "80px", resize: "vertical" },
    modalFooter: { display: "flex", gap: "8px", justifyContent: "flex-end" },
    cancelBtnSm: { padding: "9px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500" },
    saveBtn: { padding: "9px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
};

export default FinanceItem;
