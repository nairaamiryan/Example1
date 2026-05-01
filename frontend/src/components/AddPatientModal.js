import React, { useState, useEffect } from "react";

const DIAGNOSES = [
    "Հիպերտոնիա",
    "Դիաբետ",
    "Միգրեն",
    "Ասթմա",
    "Սրտի իշեմիկ հիվանդություն",
    "Ինսուլտ",
    "Արթրիտ",
    "Օստեոպորոզ",
    "Երիկամային անբավարարություն",
    "Լյարդի ցիռոզ",
    "Թոքաբորբ",
    "Բրոնխիտ",
    "Գաստրիտ",
    "Խոցային հիվանդություն",
    "Անեմիա",
    "Թիրեոիդիտ",
    "Դեպրեսիա",
    "Անհանգստության խանգարում",
    "Էպիլեպսիա",
    "Ալերգիա",
    "Այլ",
];

const AddPatientModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        age: "",
        diagnosis: "",
        email: "",
        customDiagnosis: "",
        status: "",
    });

    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [disabled, setDisabled] = useState(true);

    const onlyLetters = (value) => /^[\u0531-\u058Fa-zA-Z\s]*$/.test(value);

    useEffect(() => {
        const { name, surname, status, diagnosis, customDiagnosis, age, email } = formData;
        const diagnosisValid = diagnosis === "Այլ" ? customDiagnosis.trim() !== "" : diagnosis !== "";
        setDisabled(
            !name || !surname || !status || !diagnosisValid || !age  || !email || ageError || nameError || surnameError || emailError
        );
    }, [formData, ageError, nameError, surnameError, emailError]);

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
            setFormData({ ...formData, age: "" });
        } else if (val > 110) {
            setAgeError("Տարիքը չի կարող գերազանցել 110-ը");
            setFormData({ ...formData, age: 110 });
        } else {
            setAgeError("");
            setFormData({ ...formData, age: val });
        }
    };

    const handleEmailChange = (e) => {
        const val = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
            setEmailError("Սխալ էլ. հասցե");
        } else {
            setEmailError("");
        }

        setFormData({ ...formData, email: val });
    };

    const handleSubmit = () => {
        const finalDiagnosis =
            formData.diagnosis === "Այլ" ? formData.customDiagnosis : formData.diagnosis;
        onSubmit({ ...formData, diagnosis: finalDiagnosis });
        setFormData({ name: "", surname: "", age: "", diagnosis: "", customDiagnosis: "", status: "" });
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.titleContainer}>
                    <h2 style={styles.title}>Ավելացնել հիվանդ</h2>
                    <button style={styles.closeButton} onClick={onClose}>✕</button>
                </div>

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Անուն"
                    value={formData.name}
                    onChange={handleNameChange}
                />
                {nameError && <span style={styles.error}>{nameError}</span>}

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Ազգանուն"
                    value={formData.surname}
                    onChange={handleSurnameChange}
                />
                {surnameError && <span style={styles.error}>{surnameError}</span>}
                
                <input
                    style={styles.input}
                    type="email"
                    placeholder="էլ. հասցե"
                    value={formData.email}
                    onChange={handleEmailChange}
                />
                {emailError && <span style={styles.error}>{emailError}</span>}
                <input
                    style={styles.input}
                    type="number"
                    placeholder="Տարիք"
                    min={0}
                    max={110}
                    value={formData.age}
                    onChange={handleAgeChange}
                />
                {ageError && <span style={styles.error}>{ageError}</span>}

                <select
                    style={styles.select}
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value, customDiagnosis: "" })}
                >
                    <option value="" disabled>Ընտրեք հիվանդությունը</option>
                    {DIAGNOSES.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>

                {formData.diagnosis === "Այլ" && (
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Նշեք հիվանդության անունը"
                        value={formData.customDiagnosis}
                        onChange={(e) => setFormData({ ...formData, customDiagnosis: e.target.value })}
                    />
                )}

                <select
                    style={styles.select}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                    <option value="" disabled>Ընտրեք կարգավիճակը</option>
                    <option value="active">Ակտիվ</option>
                    <option value="stable">Կայուն</option>
                    <option value="pending">Սպասող</option>
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
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        display: "flex", flexDirection: "column", gap: "12px",
    },
    titleContainer: {
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px",
    },
    title: {
        fontSize: "20px", fontWeight: "600", color: "#1a2e4a",
    },
    closeButton: {
        background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280",
    },
    input: {
        width: "90%", padding: "10px 12px", borderRadius: "8px",
        border: "1px solid #d1d5db", fontSize: "14px", outline: "none",
    },
    select: {
        width: "95%", padding: "10px 12px", borderRadius: "8px",
        border: "1px solid #d1d5db", fontSize: "14px",
        backgroundColor: "#fff", outline: "none", cursor: "pointer",
    },
    error: {
        color: "#ef4444", fontSize: "12px", marginTop: "-8px",
    },
    addButton: {
        marginTop: "10px", padding: "10px",
        backgroundColor: "#2563eb", color: "#fff",
        border: "none", borderRadius: "8px",
        cursor: "pointer", fontWeight: "500",
    },
    addButtonDisabled: {
        marginTop: "10px", padding: "10px",
        backgroundColor: "#ccc", color: "#fff",
        border: "none", borderRadius: "8px",
        cursor: "not-allowed", fontWeight: "500",
    },
};

export default AddPatientModal;
