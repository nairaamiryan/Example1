import React, { useState } from "react";

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("hy-AM", {
        year: "numeric", month: "long", day: "numeric"
    });
};

const typeConfig = {
    diagnosis:    { label: "🩺 Ախտորոշում",    color: "#fef3c7", text: "#92400e" },
    prescription: { label: "💊 Բաղադրատոմս",   color: "#ede9fe", text: "#5b21b6" },
    labtest:      { label: "🧪 Լաբ. անալիզ",   color: "#d1fae5", text: "#065f46" },
    document:     { label: "📎 Փաստաթուղթ",    color: "#e0f2fe", text: "#0369a1" },
};

const MedicalNote = ({ note, onDelete }) => {
    const [hovered, setHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const config = typeConfig[note.type] || {};

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
                    {config.label && (
                        <span style={{ ...styles.badge, background: config.color, color: config.text }}>
                            {config.label}
                        </span>
                    )}
                    <div style={styles.title}>{note.title}</div>
                    {note.description && (
                        <div style={styles.description}>{note.description}</div>
                    )}
                    {note.fileName && (
                        <a
                            href={note.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.fileLink}
                            onClick={(e) => e.stopPropagation()}
                        >
                            📄 {note.fileName}
                        </a>
                    )}
                    {note.date && (
                        <div style={styles.date}>📅 {formatDate(note.date)}</div>
                    )}
                </div>
                <button
                    style={styles.deleteBtn}
                    onClick={(e) => { e.stopPropagation(); onDelete && onDelete(note.id); }}
                >
                    ✕
                </button>
            </div>

            {showModal && (
                <div style={styles.overlay} onClick={() => setShowModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Բժշկական նշման մանրամասներ</h2>
                            <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        {config.label && (
                            <span style={{ ...styles.badge, background: config.color, color: config.text }}>
                                {config.label}
                            </span>
                        )}
                        <div style={styles.detailRow}><b>Վերնագիր։</b> {note.title}</div>
                        {note.description && (
                            <div style={styles.detailRow}><b>Նկարագրություն։</b> {note.description}</div>
                        )}
                        {note.date && (
                            <div style={styles.detailRow}><b>Ամսաթիվ։</b> {formatDate(note.date)}</div>
                        )}
                        {note.fileName && (
                            <div style={styles.detailRow}>
                                <b>Կցված ֆայլ։</b>{" "}
                                <a href={note.fileUrl} target="_blank" rel="noreferrer" style={styles.fileLink}>
                                    📄 {note.fileName}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    card: {
        background: "white", padding: "15px 20px", borderRadius: "10px",
        display: "flex", alignItems: "flex-start", gap: "15px",
        marginBottom: "12px", transition: "transform 0.2s, box-shadow 0.2s",
    },
    content: { flex: 1, display: "flex", flexDirection: "column", gap: "4px" },
    badge: { fontSize: "11px", fontWeight: "600", padding: "3px 8px", borderRadius: "20px", alignSelf: "flex-start" },
    title: { fontSize: "15px", fontWeight: "600", color: "#1a2e4a" },
    description: { fontSize: "13px", color: "#6b7280" },
    fileLink: { fontSize: "13px", color: "#2563eb", textDecoration: "underline" },
    date: { fontSize: "12px", color: "#9ca3af" },
    deleteBtn: {
        background: "transparent", border: "none", fontSize: "16px",
        cursor: "pointer", color: "#9ca3af", padding: "4px 8px",
        borderRadius: "6px", flexShrink: 0,
    },
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "450px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "20px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    detailRow: { fontSize: "15px", color: "#374151", padding: "8px 0", borderBottom: "1px solid #f3f4f6" },
};

export default MedicalNote;
