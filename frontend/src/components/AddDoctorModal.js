import React, { useState, useEffect } from "react";

const PROFESSIONS = [
    "Կարդիոլոգ", "Նյարդաբան", "Ակնաբույժ", "Վիրաբույժ", "Մաշկաբան",
    "Ուռուցքաբան", "Էնդոկրինոլոգ", "Գաստրոէնտերոլոգ", "Ռևմատոլոգ",
    "Պուլմոնոլոգ", "Նեֆրոլոգ", "Հեմատոլոգ", "Ինֆեկցիոնիստ", "Իմունոլոգ",
    "Ալերգոլոգ", "Ռադիոլոգ", "Անեսթեզիոլոգ", "Ռեանիմատոլոգ", "Մանկաբույժ",
    "Մանկական վիրաբույժ", "Ծննդաբան-գինեկոլոգ", "Ուրոլոգ", "Անդրոլոգ",
    "Պրոկտոլոգ", "Վասկուլյար վիրաբույժ", "Թորակալ վիրաբույժ", "Նեյրովիրաբույժ",
    "Ականջ-կոկորդ-քթաբույժ", "Ստոմատոլոգ", "Ատամնաբույժ", "Ուղղափայտաբույժ",
    "Ֆիզիոթերապևտ", "Ռեֆլեքսոթերապևտ", "Սպորտային բժիշկ", "Ախտաբան",
    "Ֆարմակոլոգ", "Հոգեբույժ", "Հոգեթերապևտ", "Նարկոլոգ", "Գերիատր",
    "Ընտանեկան բժիշկ", "Շտապ օգնության բժիշկ", "Դատաբժշկական փորձագետ",
];

const onlyLettersRegex = /^[a-zA-Zաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ\u0531-\u0587\s]*$/i;

const AddDoctorModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: "", surname: "", specialty: "", age: "", email: "", patients: 0,
    });
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const { name, surname, specialty, age, email } = formData;
        setDisabled(!name || !surname || !specialty || !age || !email || nameError || surnameError);
    }, [formData, nameError, surnameError]);

    const handleName = (e) => {
        const value = e.target.value;
        if (onlyLettersRegex.test(value)) {
            setFormData({ ...formData, name: value });
            setNameError(false);
        } else {
            setNameError(true);
        }
    };

    const handleSurname = (e) => {
        const value = e.target.value;
        if (onlyLettersRegex.test(value)) {
            setFormData({ ...formData, surname: value });
            setSurnameError(false);
        } else {
            setSurnameError(true);
        }
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({ name: "", surname: "", specialty: "", age: "", email: "", patients: 0 });
        setNameError(false);
        setSurnameError(false);
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.titleContainer}>
                    <h2 style={styles.title}>Ավելացնել բժիշկ</h2>
                    <button style={styles.closeButton} onClick={onClose}>✕</button>
                </div>

                <div>
                    <input
                        style={{ ...styles.input, borderColor: nameError ? "#ef4444" : "#d1d5db" }}
                        type="text"
                        placeholder="Անուն"
                        value={formData.name}
                        onChange={handleName}
                    />
                    {nameError && (
                        <p style={styles.errorText}>⚠ Անունը կարող է պարունակել միայն տառեր</p>
                    )}
                </div>

                <div>
                    <input
                        style={{ ...styles.input, borderColor: surnameError ? "#ef4444" : "#d1d5db" }}
                        type="text"
                        placeholder="Ազգանուն"
                        value={formData.surname}
                        onChange={handleSurname}
                    />
                    {surnameError && (
                        <p style={styles.errorText}>⚠ Ազգանունը կարող է պարունակել միայն տառեր</p>
                    )}
                </div>

                <input
                    style={styles.input}
                    type="number"
                    placeholder="Տարիք"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />

                <input
                    style={styles.input}
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <select
                    style={styles.select}
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                >
                    <option value="" disabled>Ընտրեք մասնագիտությունը</option>
                    {PROFESSIONS.map((prof) => (
                        <option key={prof} value={prof}>{prof}</option>
                    ))}
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
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "#fff", padding: "24px", borderRadius: "12px",
        width: "100%", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        display: "flex", flexDirection: "column", gap: "12px",
    },
    titleContainer: {
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "4px",
    },
    title: {
        fontSize: "20px", fontWeight: "600", color: "#1a2e4a", margin: 0,
    },
    closeButton: {
        background: "transparent", border: "none",
        fontSize: "18px", cursor: "pointer", color: "#6b7280",
    },
    input: {
        width: "90%", padding: "10px 12px", borderRadius: "8px",
        border: "1px solid #d1d5db", fontSize: "14px", outline: "none",
    },
    errorText: {
        margin: "4px 0 0 2px", fontSize: "12px", color: "#ef4444",
    },
    select: {
        width: "95%", padding: "10px 12px", borderRadius: "8px",
        border: "1px solid #d1d5db", fontSize: "14px",
        backgroundColor: "#fff", outline: "none", cursor: "pointer",
    },
    addButton: {
        marginTop: "6px", padding: "10px", backgroundColor: "#2563eb",
        color: "#fff", border: "none", borderRadius: "8px",
        cursor: "pointer", fontWeight: "500",
    },
    addButtonDisabled: {
        marginTop: "6px", padding: "10px", backgroundColor: "#ccc",
        color: "#fff", border: "none", borderRadius: "8px",
        cursor: "not-allowed", fontWeight: "500",
    },
};

export default AddDoctorModal;
