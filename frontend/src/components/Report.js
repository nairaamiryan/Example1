import React, { useState } from "react";

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("hy-AM", {
        year: "numeric", month: "long", day: "numeric"
    });
};

const Report = ({ report, onDelete, onPin, onArchive, onDuplicate, onLock, onEdit, onShare, onMarkRead }) => {
    const [hovered, setHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [showLog, setShowLog] = useState(false);
    const [shareEmail, setShareEmail] = useState("");
    const [editData, setEditData] = useState({ title: report.title, description: report.description });

    const handleOpen = () => {
        setShowModal(true);
        onMarkRead && onMarkRead(report.id);
    };

    const handleEditSubmit = () => {
        if (!editData.title || !editData.description) return;
        onEdit && onEdit(report.id, editData);
        setShowEdit(false);
        setShowModal(false);
    };

    const handleShareSubmit = () => {
        if (!shareEmail.trim()) return;
        onShare && onShare(report.id, shareEmail.trim());
        setShareEmail("");
        setShowShare(false);
        setShowModal(false);
    };

    const handleDownloadPDF = () => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>${report.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #1a2e4a; }
                    h1 { font-size: 22px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                    .row { margin: 16px 0; font-size: 15px; }
                    .label { font-weight: bold; color: #374151; }
                    .value { margin-top: 4px; color: #6b7280; }
                </style>
            </head>
            <body>
                <h1>${report.title}</h1>
                <div class="row"><div class="label">Վերնագիր։</div><div class="value">${report.title}</div></div>
                <div class="row"><div class="label">Նկարագրություն։</div><div class="value">${report.description}</div></div>
                ${report.date ? `<div class="row"><div class="label">Ամսաթիվ։</div><div class="value">${formatDate(report.date)}</div></div>` : ""}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { printWindow.print(); printWindow.close(); }, 300);
    };

    const closeAll = () => {
        setShowModal(false);
        setShowEdit(false);
        setShowShare(false);
        setShowLog(false);
    };

    return (
        <>
            {/* CARD */}
            <div
                style={{
                    ...styles.card,
                    boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
                    transform: hovered ? "translateY(-2px)" : "translateY(0)",
                    borderLeft: report.pinned ? "4px solid #f59e0b" : "4px solid transparent",
                    cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleOpen}
            >
                {/* Unread dot */}
                {!report.read && <div style={styles.unreadDot} />}

                <div style={styles.content}>
                    <div style={styles.titleRow}>
                        <span style={{ ...styles.title, fontWeight: report.read ? "500" : "700" }}>
                            {report.title}
                        </span>
                        <div style={styles.badges}>
                            {report.pinned && <span style={styles.badge} title="Ամրացված">📌</span>}
                            {report.locked && <span style={styles.badge} title="Կողպված">🔒</span>}
                            {report.archived && <span style={styles.badge} title="Արխիվ">📦</span>}
                        </div>
                    </div>
                    <div style={styles.description}>{report.description}</div>
                    {report.date && (
                        <div style={styles.date}>📅 {formatDate(report.date)}</div>
                    )}
                </div>

                {!report.locked && (
                    <button
                        style={styles.deleteBtn}
                        onClick={(e) => { e.stopPropagation(); onDelete && onDelete(report.id); }}
                        title="Ջնջել"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* VIEW MODAL */}
            {showModal && !showEdit && !showShare && !showLog && (
                <div style={styles.overlay} onClick={closeAll}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Հաշվետվության մանրամասներ</h2>
                            <button style={styles.closeBtn} onClick={closeAll}>✕</button>
                        </div>

                        {/* Action buttons grid */}
                        <div style={styles.actionGrid}>
                            <button style={styles.actionBtn} onClick={() => setShowEdit(true)}>
                                ✏️ Խմբագրել
                            </button>
                            <button style={styles.actionBtn} onClick={() => { onPin && onPin(report.id); }}>
                                📌 {report.pinned ? "Ապասրահել" : "Ամրացնել"}
                            </button>
                            <button style={styles.actionBtn} onClick={() => { onArchive && onArchive(report.id); closeAll(); }}>
                                📦 {report.archived ? "Ապաարխիվ" : "Արխիվ"}
                            </button>
                            <button style={styles.actionBtn} onClick={() => { onDuplicate && onDuplicate(report.id); closeAll(); }}>
                                📋 Կրկնօրինակ
                            </button>
                            <button style={styles.actionBtn} onClick={() => setShowShare(true)}>
                                🔗 Կիսվել
                            </button>
                            <button style={styles.actionBtn} onClick={() => { onLock && onLock(report.id); }}>
                                {report.locked ? "🔓 Ապակողպել" : "🔒 Կողպել"}
                            </button>
                            <button style={styles.actionBtn} onClick={() => setShowLog(true)}>
                                📋 Մատյան
                            </button>
                            <button style={{ ...styles.actionBtn, ...styles.pdfBtn }} onClick={handleDownloadPDF}>
                                ⬇ PDF
                            </button>
                        </div>

                        <div style={styles.detailRow}><b>Վերնագիր։</b> {report.title}</div>
                        <div style={styles.detailRow}><b>Նկարագրություն։</b> {report.description}</div>
                        {report.date && (
                            <div style={styles.detailRow}><b>Ամսաթիվ։</b> {formatDate(report.date)}</div>
                        )}
                        {report.locked && (
                            <div style={styles.lockedNote}>🔒 Կողպված հաշվետվություն — ջնջումն արգելված է</div>
                        )}
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEdit && (
                <div style={styles.overlay} onClick={() => setShowEdit(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Խմբագրել հաշվետվությունը</h2>
                            <button style={styles.closeBtn} onClick={() => setShowEdit(false)}>✕</button>
                        </div>
                        <input
                            style={styles.input}
                            value={editData.title}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            placeholder="Վերնագիր"
                        />
                        <textarea
                            style={styles.textarea}
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            placeholder="Նկարագրություն"
                        />
                        <div style={styles.modalFooter}>
                            <button style={styles.cancelBtnSm} onClick={() => setShowEdit(false)}>Չեղարկել</button>
                            <button style={styles.saveBtn} onClick={handleEditSubmit}>Պահպանել</button>
                        </div>
                    </div>
                </div>
            )}

            {/* SHARE MODAL */}
            {showShare && (
                <div style={styles.overlay} onClick={() => setShowShare(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Կիսվել հաշվետվությամբ</h2>
                            <button style={styles.closeBtn} onClick={() => setShowShare(false)}>✕</button>
                        </div>
                        <p style={styles.shareNote}>Մուտքագրեք բժշկի անունը կամ էլ. փոստը</p>
                        <input
                            style={styles.input}
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                            placeholder="doctor@example.com"
                            type="email"
                        />
                        <div style={styles.modalFooter}>
                            <button style={styles.cancelBtnSm} onClick={() => setShowShare(false)}>Չեղարկել</button>
                            <button
                                style={shareEmail.trim() ? styles.saveBtn : styles.saveBtnDisabled}
                                disabled={!shareEmail.trim()}
                                onClick={handleShareSubmit}
                            >
                                🔗 Ուղարկել
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ACCESS LOG MODAL */}
            {showLog && (
                <div style={styles.overlay} onClick={() => setShowLog(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>📋 Մուտքի մատյան</h2>
                            <button style={styles.closeBtn} onClick={() => setShowLog(false)}>✕</button>
                        </div>
                        <p style={styles.shareNote}>Ո՞վ և ե՞րբ է բացել այս հաշվետվությունը</p>
                        {report.accessLog && report.accessLog.length > 0 ? (
                            <div style={styles.logList}>
                                {[...report.accessLog].reverse().map((entry, i) => (
                                    <div key={i} style={styles.logRow}>
                                        <div style={styles.logIcon}>👤</div>
                                        <div>
                                            <div style={styles.logUser}>{entry.user}</div>
                                            <div style={styles.logTime}>{entry.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: "#9ca3af", fontSize: "14px", textAlign: "center", padding: "20px 0" }}>
                                Մատյանը դատարկ է
                            </p>
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
        display: "flex", alignItems: "center", gap: "12px",
        marginBottom: "12px", transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
    },
    unreadDot: {
        width: "8px", height: "8px", borderRadius: "50%",
        background: "#2563eb", flexShrink: 0,
    },
    content: { flex: 1 },
    titleRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" },
    title: { fontSize: "15px", color: "#1a2e4a" },
    badges: { display: "flex", gap: "4px" },
    badge: { fontSize: "13px" },
    description: { fontSize: "13px", color: "#6b7280", marginBottom: "4px" },
    date: { fontSize: "12px", color: "#9ca3af" },
    deleteBtn: {
        background: "transparent", border: "none", fontSize: "16px",
        cursor: "pointer", color: "#9ca3af", padding: "4px 8px",
        borderRadius: "6px", flexShrink: 0,
    },
    overlay: {
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff", padding: "24px", borderRadius: "14px",
        width: "100%", maxWidth: "460px", boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        display: "flex", flexDirection: "column", gap: "12px",
        maxHeight: "90vh", overflowY: "auto",
    },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "18px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },

    actionGrid: {
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px",
    },
    actionBtn: {
        padding: "9px 12px", background: "#f8fafc", border: "1px solid #e5e7eb",
        borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500",
        color: "#374151", textAlign: "left", transition: "background 0.15s",
    },
    pdfBtn: { background: "#2563eb", color: "white", border: "none" },

    detailRow: { fontSize: "14px", color: "#374151", padding: "8px 0", borderBottom: "1px solid #f3f4f6" },
    lockedNote: { fontSize: "13px", color: "#ef4444", background: "#fef2f2", padding: "10px 14px", borderRadius: "8px" },

    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    textarea: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", minHeight: "100px", resize: "vertical" },
    modalFooter: { display: "flex", gap: "8px", justifyContent: "flex-end" },
    cancelBtnSm: { padding: "9px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500" },
    saveBtn: { padding: "9px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
    saveBtnDisabled: { padding: "9px 18px", background: "#d1d5db", color: "white", border: "none", borderRadius: "8px", cursor: "not-allowed", fontSize: "13px", fontWeight: "600" },

    shareNote: { fontSize: "13px", color: "#6b7280" },

    logList: { display: "flex", flexDirection: "column", gap: "8px" },
    logRow: { display: "flex", gap: "10px", alignItems: "center", padding: "10px 12px", background: "#f8fafc", borderRadius: "8px" },
    logIcon: { fontSize: "20px" },
    logUser: { fontSize: "14px", fontWeight: "500", color: "#1a2e4a" },
    logTime: { fontSize: "12px", color: "#9ca3af" },
};

export default Report;
