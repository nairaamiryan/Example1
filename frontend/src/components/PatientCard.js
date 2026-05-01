import React, { useState } from "react";
import { PATIENTS, STATUS_COLORS } from "../constants";

const STATUSES = ["active", "stable", "pending"];
const STATUS_LABELS = { active: "Ակտիվ", stable: "Կայուն", pending: "Սպասող" };

const PatientCard = ({ patient, onDelete, onEdit, onStatusChange }) => {
    const [hovered, setHovered] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [formData, setFormData] = useState({
        name: patient.name,
        surname: patient.surname,
        diagnosis: patient.diagnosis,
        age: patient.age,
        status: patient.status,
    });

    const onlyLetters = (value) => /^[\u0531-\u058Fa-zA-Z\s]*$/.test(value);

    const handleNameChange = (e) => {
        const val = e.target.value;
        if (!onlyLetters(val)) {
            setNameError("Անունը կարող է պարունակել միայն տառեր");
        } else {
            setNameError("");
            setFormData({ ...formData, name: val });
        }
    };

    const handleSurnameChange = (e) => {
        const val = e.target.value;
        if (!onlyLetters(val)) {
            setSurnameError("Ազգանունը կարող է պարունակել միայն տառեր");
        } else {
            setSurnameError("");
            setFormData({ ...formData, surname: val });
        }
    };

    const handleAgeChange = (e) => {
        const val = parseInt(e.target.value);
        if (isNaN(val) || val < 0) {
            setAgeError("Տարիքը չի կարող բացասական լինել");
            setFormData({ ...formData, age: 0 });
        } else if (val > 110) {
            setAgeError("Տարիքը չի կարող գերազանցել 110-ը");
            setFormData({ ...formData, age: 110 });
        } else {
            setAgeError("");
            setFormData({ ...formData, age: val });
        }
    };

    const handleEditSubmit = () => {
        if (nameError || surnameError || ageError) return;
        onEdit && onEdit(patient.id, formData);
        setShowEdit(false);
    };

    return (
        <>
            <div
                style={{
                    ...styles.card,
                    boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
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
                    <button style={styles.btn} onClick={() => setShowView(true)}>Դիտել</button>
                    <button style={styles.btn} onClick={() => setShowEdit(true)}>Խմբագրել</button>
                    <button style={styles.delete} onClick={() => onDelete(patient.id, `${patient.name} ${patient.surname}`)}>Ջնջել</button>
                </div>
            </div>

            {/* VIEW MODAL */}
            {showView && (
                <div style={styles.overlay} onClick={() => setShowView(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>Հիվանդի մանրամասներ</h2>
                            <button style={styles.closeBtn} onClick={() => setShowView(false)}>✕</button>
                        </div>
                        <div style={styles.avatarLarge}>{patient.name[0]}</div>
                        <div style={styles.detailRow}><b>Անուն։</b> {patient.name} {patient.surname}</div>
                        <div style={styles.detailRow}><b>Ախտորոշում։</b> {patient.diagnosis}</div>
                        <div style={styles.detailRow}><b>Տարիք։</b> {patient.age}</div>
                        <div style={styles.detailRow}>
                            <b>Կարգավիճակ։</b>{" "}
                            <span style={{ ...styles.statusBadge, background: STATUS_COLORS(patient.status) }}>
                                {STATUS_LABELS[patient.status] || patient.status}
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
                            <button style={styles.closeBtn} onClick={() => setShowEdit(false)}>✕</button>
                        </div>

                        <input
                            style={styles.input}
                            placeholder="Անուն"
                            defaultValue={formData.name}
                            onChange={handleNameChange}
                        />
                        {nameError && <span style={styles.error}>{nameError}</span>}

                        <input
                            style={styles.input}
                            placeholder="Ազգանուն"
                            defaultValue={formData.surname}
                            onChange={handleSurnameChange}
                        />
                        {surnameError && <span style={styles.error}>{surnameError}</span>}

                        <input
                            style={styles.input}
                            placeholder="Ախտորոշում"
                            defaultValue={formData.diagnosis}
                            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        />

                        <input
                            style={styles.input}
                            type="number"
                            placeholder="Տարիք"
                            min={0}
                            max={110}
                            defaultValue={formData.age}
                            onChange={handleAgeChange}
                        />
                        {ageError && <span style={styles.error}>{ageError}</span>}

                        <select
                            style={styles.input}
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="active">Ակտիվ</option>
                            <option value="stable">Կայուն</option>
                            <option value="pending">Սպասող</option>
                        </select>

                        <button style={styles.saveButton} onClick={handleEditSubmit}>Պահպանել</button>
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    card: { background: "white", padding: "15px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "15px", marginBottom: "12px", transition: "transform 0.2s, box-shadow 0.2s" },
    avatar: { width: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(135deg, #67df6f 0%, #4ba292 100%)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", fontSize: "14px", flexShrink: 0 },
    avatarLarge: { width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(135deg, #67df6f 0%, #4ba292 100%)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", fontSize: "28px", margin: "0 auto 8px" },
    info: { flex: 1 },
    name: { fontSize: "15px", fontWeight: "600", color: "#1a2e4a", marginBottom: "4px" },
    diagnosis: { fontSize: "13px", color: "#6b7280", marginBottom: "2px" },
    age: { fontSize: "12px", color: "#9ca3af" },
    actions: { display: "flex", gap: "6px" },
    btn: { padding: "5px 10px", border: "none", borderRadius: "5px", background: "#e5e7eb", cursor: "pointer", fontSize: "12px" },
    delete: { padding: "5px 10px", border: "none", borderRadius: "5px", background: "#ef4444", color: "white", cursor: "pointer", fontSize: "12px" },
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "20px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    detailRow: { fontSize: "15px", color: "#374151", padding: "8px 0", borderBottom: "1px solid #f3f4f6" },
    statusBadge: { padding: "3px 10px", borderRadius: "6px", color: "white", fontSize: "12px", fontWeight: "500" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    saveButton: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    error: { color: "#ef4444", fontSize: "12px", marginTop: "-8px" },
};

export default PatientCard;
