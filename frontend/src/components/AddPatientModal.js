import React, { useState, useEffect } from "react";

const AddPatientModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        age: "",
        status: "",
    });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const { name, surname, status } = formData;
        setDisabled(!name || !surname || !status);
    }, [formData]);

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({ name: "", surname: "", age: "", status: "" });
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.titleContainer}>
                    <h2 style={styles.title}>Ավելացնել հիվանդ</h2>
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

                <input
                    style={styles.input}
                    type="number"
                    placeholder="Տարիք"
                    value={formData.age}
                    onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                    }
                />

                <select
                    style={styles.select}
                    value={formData.status}
                    onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                    }
                >
                    <option value="" disabled>
                        Ընտրեք կարգավիճակը
                    </option>
                    <option value="Active">Active</option>
                    <option value="Stable">Stable</option>
                    <option value="Pending">Pending</option>
                </select>

                <button
                    disabled={disabled}
                    style={disabled ? styles.addButtonDisabled : styles.addButton}
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

export default AddPatientModal;
