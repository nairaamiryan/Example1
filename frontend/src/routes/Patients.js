import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PatientCard from "../components/PatientCard";
import api from "../services/api";
import { LOADING, PATIENTS } from "../constants";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        const response = await api.getPatients();
        if (response.success) {
            setPatients(response.data);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div style={styles.loading}>{LOADING}</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />

            <div style={styles.container}>
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>{PATIENTS.TITLE}</h1>
                        <p style={styles.subtitle}>
                            {PATIENTS.TOTAL_PATIENTS(patients.length)}
                        </p>
                    </div>
                    <button style={styles.addButton}>
                        {PATIENTS.ADD_PATIENT}
                    </button>
                </div>

                <div style={styles.patientsList}>
                    {patients.map((patient) => (
                        <PatientCard key={patient.id} patient={patient} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "30px",
    },
    title: {
        fontSize: "32px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "5px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#6b7280",
    },
    addButton: {
        padding: "12px 24px",
        background: "#2563a8",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background 0.2s",
    },
    patientsList: {
        maxWidth: "800px",
    },
    loading: {
        textAlign: "center",
        padding: "60px 20px",
        fontSize: "16px",
        color: "#6b7280",
    },
};

export default Patients;
