import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PatientCard from "../components/PatientCard";
import api from "../services/api";
import { LOADING, PATIENTS } from "../constants";
import AddPatientModal from "../components/AddPatientModal";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);

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

    const addPatient = async (patientData) => {
        const res = await api.addPatient(patientData);
        if (res.success) {
            setPatients([...patients, res.data]);
            setShowForm(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this patient?");
        if (!confirmDelete) return;
        const response = await api.deletePatient(id);
        if (response.success) {
            setPatients((prev) => prev.filter((patient) => patient.id !== id));
        }
    };

    const handleEdit = (id, updatedData) => {
        setPatients((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
        );
    };

    const handleStatusChange = (id, newStatus) => {
        setPatients((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
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
                    <div style={styles.stats}>
                        <span>Total: {patients.length}</span>
                        <span>
                            Active:{" "}
                            {patients.filter((p) => p.status === "Active").length}
                        </span>
                        <span>
                            Pending:{" "}
                            {patients.filter((p) => p.status === "Pending").length}
                        </span>
                    </div>
                    <div>
                        <h1 style={styles.title}>{PATIENTS.TITLE}</h1>
                        <p style={styles.subtitle}>
                            {PATIENTS.TOTAL_PATIENTS(patients.length)}
                        </p>
                    </div>

                    <div style={styles.right}>
                        <input
                            type="text"
                            placeholder={PATIENTS.SEARCH}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={styles.search}
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={styles.select}
                        >
                            <option value="All">All</option>
                            <option value="active">Active</option>
                            <option value="stable">Stable</option>
                            <option value="pending">Pending</option>
                        </select>

                        <button
                            style={styles.addButton}
                            onClick={() => setShowForm(true)}
                        >
                            {PATIENTS.ADD_PATIENT}
                        </button>
                    </div>
                </div>

                {showForm && (
                    <AddPatientModal
                        isOpen={showForm}
                        onClose={() => setShowForm(false)}
                        onSubmit={addPatient}
                    />
                )}

                <div style={styles.patientsList}>
                    {patients
                        .filter((patient) =>
                            patient.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .filter((patient) =>
                            statusFilter === "All"
                                ? true
                                : patient.status === statusFilter
                        )
                        .map((patient) => (
                            <PatientCard
                                key={patient.id}
                                patient={patient}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onStatusChange={handleStatusChange}
                            />
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
    stats: {
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        fontSize: "14px",
        color: "#6b7280",
    },
    select: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
    search: {
        padding: "10px 15px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        width: "250px",
    },
    right: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
    },
    loading: {
        textAlign: "center",
        padding: "60px 20px",
        fontSize: "16px",
        color: "#6b7280",
    },
};

export default Patients;
