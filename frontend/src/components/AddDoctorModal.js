import React, { useState, useEffect } from "react";
import { PROFESSIONS } from "../constants";

const AddDoctorModal = ({
    isOpen,
    onClose,
    newDoctor,
    setNewDoctor,
    onSubmit,
}) => {
    if (!isOpen) return null;
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        specialty: "",
        patients: 0,
    });

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({ name: "", surname: "", specialty: "", patients: 0 });
    };
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const { name, surname, specialty } = formData;
        setDisabled(!name || !surname || !specialty);
    }, [formData]);

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.titleContainer}>
                    <h2 style={styles.title}>Ավելացնել բժիշկ</h2>
                    <button style={styles.closeButton} onClick={onClose}>
                        X
                    </button>
                </div>

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Անուն"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Ազգանուն"
                    value={formData.surname}
                    onChange={(e) =>
                        setFormData({ ...formData, surname: e.target.value })
                    }
                />

                <select
                    style={styles.select}
                    value={formData.specialty}
                    onChange={(e) =>
                        setFormData({ ...formData, specialty: e.target.value })
                    }
                >
                    <option value="" disabled>
                        Ընտրեք մասնագիտությունը
                    </option>
                    {Object.entries(PROFESSIONS).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <button
                    disabled={disabled}
                    style={
                        disabled ? styles.addButtonDisabled : styles.addButton
                    }
                    onClick={handleSubmit}
                >
                    Ավելացնել
                </button>
            </div>
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    titleContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    closeButton: {
        background: "transparent",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        color: "#6b7280",
    },
    title: {
        marginBottom: "10px",
        fontSize: "20px",
        fontWeight: "600",
        color: "#1a2e4a",
        textAlign: "center",
    },
    input: {
        width: "90%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        outline: "none",
    },
    select: {
        width: "95%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        backgroundColor: "#fff",
        outline: "none",
        cursor: "pointer",
    },
    addButton: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500",
        transition: "0.2s",
    },
    addButtonDisabled: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#ccc",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "not-allowed",
        fontWeight: "500",
        transition: "0.2s",
    },
};

export default AddDoctorModal;
