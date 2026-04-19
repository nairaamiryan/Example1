import React, { useState } from "react";
import { PATIENTS, STATUS_COLORS } from "../constants";

const STATUSES = ["Active", "Stable", "Pending"];

const PatientCard = ({ patient, onDelete, onEdit, onStatusChange }) => {
    const [hovered, setHovered] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: patient.name,
        surname: patient.surname,
        diagnosis: patient.diagnosis,
        age: patient.age,
    });

    const handleEditSubmit = () => {
        onEdit && onEdit(patient.id, formData);
        setShowEdit(false);
    };

    const handleStatusClick = () => {
        const currentIndex = STATUSES.indexOf(patient.status);
        const nextStatus = STATUSES[(currentIndex + 1) % STATUSES.length];
        onStatusChange && onStatusChange(patient.id, nextStatus);
    };

    return (
        <>
            <div
                style={{
                    ...styles.card,
                    boxShadow: hovered
                        ? "0 6px 20px rgba(0,0,0,0.15)"
                        : "0 2px 8px rgba(0,0,0,0.08)",
                    transform: hovered ? "translateY(-2px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div style={styles.avatar}>{patient.name[0]}</div>
                <div style={styles.info}>
                    <div style={styles.name}>{patient.name} {patient.surname}</div>
                    <div style={styles.diagnosis}>{patient.diagnosis}</div>
                    <div style={styles.age}>{PATIENTS.AGE} {patient.age}</div>
                </div>
                <div style={styles.actions}>
                    <button style={styles.btn} onClick={() => setShowView(true)}>View</button>
                    <button style={styles.btn} onClick={() => setShowEdit(true)}>Edit</button>
                    <button style={styles.delete} onClick={() => onDelete(patient.id)}>Delete</button>
                </div>
                <div
                    style={{ ...styles.status, background: STATUS_COLORS(patient.status), cursor: "pointer" }}
                    onClick={handleStatusClick}
                    title="Սեղմիր փոխելու համար"
                >
                    {patient.status}
                </div>
            </div>

            {/* VIEW MODAL */}
            {showView && (
                <div style={styles.overlay} onClick={() => setShowView(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Հիվանդի մանրամասներ</h2>
                            <button style={styles.closeBtn} onClick={() => setShowView(false)}>X</button>
                        </div>
                        <div style={styles.avatarLarge}>{patient.name[0]}</div>
                        <div style={styles.detailRow}><b>Անուն։</b> {patient.name} {patient.surname}</div>
                        <div style={styles.detailRow}><b>Ախտորոշում։</b> {patient.diagnosis}</div>
                        <div style={styles.detailRow}><b>Տարիք։</b> {patient.age}</div>
                        <div style={styles.detailRow}>
                            <b>Կարգավիճակ։</b>{" "}
                            <span style={{ ...styles.statusBadge, background: STATUS_COLORS(patient.status) }}>
                                {patient.status}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEdit && (
                <div style={styles.overlay} onClick={() => setShowEdit(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Խմբագրել հիվանդին</h2>
                            <button style={styles.closeBtn} onClick={() => setShowEdit(false)}>X</button>
                        </div>
                        <input
                            style={styles.input}
                            placeholder="Անուն"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            placeholder="Ազգանուն"
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            placeholder="Ախտորոշում"
                            value={formData.diagnosis}
                            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            type="number"
                            placeholder="Տարիք"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                        <button style={styles.saveButton} onClick={handleEditSubmit}>Պահպանել</button>
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    card: {
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "12px",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    avatar: {
        width: "50px", height: "50px", borderRadius: "50%",
        background: "linear-gradient(135deg, #67df6f 0%, #4ba292 100%)",
        color: "white", display: "flex", alignItems: "center",
        justifyContent: "center", fontWeight: "600", fontSize: "14px", flexShrink: 0,
    },
    avatarLarge: {
        width: "70px", height: "70px", borderRadius: "50%",
        background: "linear-gradient(135deg, #67df6f 0%, #4ba292 100%)",
        color: "white", display: "flex", alignItems: "center",
        justifyContent: "center", fontWeight: "600", fontSize: "28px", margin: "0 auto 8px",
    },
    info: { flex: 1 },
    name: { fontSize: "15px", fontWeight: "600", color: "#1a2e4a", marginBottom: "4px" },
    diagnosis: { fontSize: "13px", color: "#6b7280", marginBottom: "2px" },
    age: { fontSize: "12px", color: "#9ca3af" },
    actions: { display: "flex", gap: "6px", marginRight: "10px" },
    btn: { padding: "5px 10px", border: "none", borderRadius: "5px", background: "#e5e7eb", cursor: "pointer", fontSize: "12px" },
    delete: { padding: "5px 10px", border: "none", borderRadius: "5px", background: "#ef4444", color: "white", cursor: "pointer", fontSize: "12px" },
    status: { padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "500", color: "white" },
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "20px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    detailRow: { fontSize: "15px", color: "#374151", padding: "8px 0", borderBottom: "1px solid #f3f4f6" },
    statusBadge: { padding: "3px 10px", borderRadius: "6px", color: "white", fontSize: "12px", fontWeight: "500" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    saveButton: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
};

export default PatientCard;
