import React, { useState } from "react";
import { PATIENT } from "../constants";

const DoctorCard = ({ doctor, onDelete, onClick, onEdit }) => {
    const [hovered, setHovered] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({
        name: doctor.name,
        surname: doctor.surname,
        specialty: doctor.specialty,
        age: doctor.age,
        email: doctor.email,
    });

    const handleEditSubmit = async () => {
        await onEdit(doctor.id, editData);
        setShowEditModal(false);
    };

    return (
        <>
            <div
                style={{
                    ...styles.doctorCard,
                    transform: hovered ? "scale(1.03)" : "scale(1)",
                    boxShadow: hovered
                        ? "0 8px 24px rgba(0,0,0,0.18)"
                        : "0 2px 8px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => onClick && onClick(doctor)}
            >
                <button
                    style={styles.deleteBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete && onDelete(doctor.id);
                    }}
                >
                    ✕
                </button>
                <button
                    style={styles.editBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowEditModal(true);
                    }}
                >
                    ✎
                </button>
                <div style={styles.doctorAvatar}>{doctor?.name[0]}</div>
                <div style={styles.doctorName}>{doctor?.name} {doctor?.surname}</div>
                <div style={styles.doctorSpecialty}>{doctor?.specialty}</div>
                <div style={styles.doctorPatients}>
                    {doctor?.patients} {PATIENT}
                </div>
            </div>

            {showEditModal && (
                <div style={styles.overlay} onClick={() => setShowEditModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Խմբագրել բժիշկին</h3>
                        <input
                            style={styles.input}
                            placeholder="Անուն"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            placeholder="Ազգանուն"
                            value={editData.surname}
                            onChange={(e) => setEditData({ ...editData, surname: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            placeholder="Մասնագիտություն"
                            value={editData.specialty}
                            onChange={(e) => setEditData({ ...editData, specialty: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            placeholder="Տարիք"
                            type="number"
                            value={editData.age}
                            onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                        />
                        <input
                            style={styles.input}
                            placeholder="Email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        />
                        <div style={styles.modalButtons}>
                            <button style={styles.cancelButton} onClick={() => setShowEditModal(false)}>
                                Չեղարկել
                            </button>
                            <button style={styles.saveButton} onClick={handleEditSubmit}>
                                Պահպանել
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    doctorCard: {
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
    },
    deleteBtn: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "transparent",
        border: "none",
        fontSize: "14px",
        cursor: "pointer",
        color: "#9ca3af",
        padding: "2px 6px",
        borderRadius: "6px",
    },
    editBtn: {
        position: "absolute",
        top: "10px",
        right: "35px",
        background: "transparent",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        color: "#9ca3af",
        padding: "2px 6px",
        borderRadius: "6px",
    },
    doctorAvatar: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #66a8ea 0%, #1ba073 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "600",
        margin: "0 auto 15px",
    },
    doctorName: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "5px",
    },
    doctorSpecialty: {
        fontSize: "14px",
        color: "#6b7280",
        marginBottom: "8px",
    },
    doctorPatients: {
        fontSize: "12px",
        color: "#9ca3af",
    },
    overlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        background: "white",
        borderRadius: "16px",
        padding: "32px 28px",
        maxWidth: "400px",
        width: "90%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    modalTitle: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#1a2e4a",
        marginBottom: "8px",
    },
    input: {
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
    },
    modalButtons: {
        display: "flex",
        gap: "12px",
        justifyContent: "flex-end",
        marginTop: "8px",
    },
    cancelButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        background: "white",
        color: "#374151",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
    },
    saveButton: {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "none",
        background: "#2563eb",
        color: "white",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
    },
};

export default DoctorCard;
