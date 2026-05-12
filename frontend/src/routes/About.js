import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import api from "../services/api";
import { LOADING, ABOUT } from "../constants";
import AddDoctorModal from "../components/AddDoctorModal";
import Footer from "../components/Footer";

const InfoCard = ({ icon, label, value }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: hovered
                    ? "0 8px 24px rgba(37,99,235,0.18)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>{icon}</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>{label}</div>
            <div style={{ fontSize: "28px", fontWeight: "600", color: "#1a2e4a" }}>{value}</div>
        </div>
    );
};

const About = () => {
    const [aboutInfo, setAboutInfo] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchDoctor, setSearchDoctor] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [aboutRes, doctorsRes] = await Promise.all([
            api.getAboutInfo(),
            api.getDoctors(),
        ]);
        if (aboutRes.success) setAboutInfo(aboutRes.data);
        if (doctorsRes.success) setDoctors(doctorsRes.data);
        setLoading(false);
    };

    const addDoctor = async (doctorData) => {
        const res = await api.addDoctor(doctorData);
        if (res.success) {
            setDoctors([...doctors, res.data]);
            setShowForm(false);
        }
    };

    const editDoctor = async (id, updatedData) => {
        const response = await api.updateDoctor(id, updatedData);
        if (response.success) {
            setDoctors((prev) =>
                prev.map((d) => (d.id === id ? { ...d, ...updatedData } : d))
            );
        }
    };

    const deleteDoctor = async (id) => {
        const response = await api.deleteDoctor(id);
        if (response.success) {
            setDoctors((prev) => prev.filter((d) => d.id !== id));
        }
        setConfirmDeleteId(null);
    };

    const filteredDoctors = doctors
        .filter((doctor) => {
            const fullName = `${doctor.name} ${doctor.surname}`.toLowerCase();
            return fullName.includes(searchDoctor.toLowerCase());
        })
        .sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "patients") return (b.patients || 0) - (a.patients || 0);
            return 0;
        });

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
                <h1 style={styles.title}>{aboutInfo.title}</h1>
                <p style={styles.description}>{aboutInfo.description}</p>

                <div style={styles.infoGrid}>
                    <InfoCard
                        icon={ABOUT.FOUNDED.ICON}
                        label={ABOUT.FOUNDED.LABEL}
                        value={aboutInfo.founded}
                    />
                    <InfoCard
                        icon={ABOUT.STAFF.ICON}
                        label={ABOUT.STAFF.LABEL}
                        value={doctors.length}
                    />
                </div>

                <h2 style={styles.doctors}>{ABOUT.STAFF.LABEL}</h2>

                <div style={styles.controls}>
                    <input
                        type="text"
                        placeholder="Որոնել բժիշկին..."
                        value={searchDoctor}
                        onChange={(e) => setSearchDoctor(e.target.value)}
                        style={styles.filterInput}
                    />
                    <div style={styles.sortGroup}>
                        <span style={styles.sortLabel}>Դասակարգել՝</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={styles.select}
                        >
                            <option value="name">Ըստ անվան</option>
                            <option value="patients">Ըստ հիվանդների</option>
                        </select>
                    </div>
                    <button style={styles.addBtn} onClick={() => setShowForm(true)}>
                        + Ավելացնել բժիշկ
                    </button>
                </div>

                {showForm && (
                    <AddDoctorModal
                        isOpen={showForm}
                        onClose={() => setShowForm(false)}
                        onSubmit={addDoctor}
                    />
                )}

                {selectedDoctor && (
                    <div style={styles.modalOverlay} onClick={() => setSelectedDoctor(null)}>
                        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div style={styles.modalHeader}>
                                <h2 style={styles.modalTitle}>Բժիշկի մանրամասներ</h2>
                                <button style={styles.closeBtn} onClick={() => setSelectedDoctor(null)}>✕</button>
                            </div>
                            <div style={styles.doctorAvatar}>{selectedDoctor.name[0]}</div>
                            <div style={styles.detailRow}><b>Անուն։</b> {selectedDoctor.name} {selectedDoctor.surname}</div>
                            <div style={styles.detailRow}><b>Մասնագիտություն։</b> {selectedDoctor.specialty}</div>
                            <div style={styles.detailRow}><b>Հիվանդներ։</b> {selectedDoctor.patients}</div>
                        </div>
                    </div>
                )}

                {confirmDeleteId && (
                    <div style={styles.modalOverlay} onClick={() => setConfirmDeleteId(null)}>
                        <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
                            <h3 style={styles.confirmTitle}>Ջնջե՞լ բժիշկին</h3>
                            <p style={styles.confirmText}>Համոզված եք, որ ուզում եք ջնջել այս բժիշկին։ Այս գործողությունը հետ չի կարող կատարվել։</p>
                            <div style={styles.confirmBtns}>
                                <button style={styles.cancelBtn} onClick={() => setConfirmDeleteId(null)}>Չեղարկել</button>
                                <button style={styles.deleteBtn} onClick={() => deleteDoctor(confirmDeleteId)}>Ջնջել</button>
                            </div>
                        </div>
                    </div>
                )}

                <div style={styles.doctorsGrid}>
                    {filteredDoctors.map((doctor) => (
                        <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            onDelete={() => setConfirmDeleteId(doctor.id)}
                            onEdit={editDoctor}
                            onClick={setSelectedDoctor}
                        />
                    ))}
                </div>
            </div>
         <Footer />
        </div>
    );
};

const styles = {
    container: { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" },
    title: { fontSize: "32px", fontWeight: "600", color: "#1a2e4a", marginBottom: "15px" },
    description: { fontSize: "16px", color: "#6b7280", marginBottom: "30px", lineHeight: "1.6" },
    controls: { display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" },
    filterInput: { padding: "8px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", width: "220px" },
    sortGroup: { display: "flex", alignItems: "center", gap: "8px" },
    sortLabel: { fontSize: "13px", color: "#6b7280", fontWeight: "500" },
    select: { padding: "8px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
    infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "50px" },
    addBtn: { background: "#2563eb", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
    doctors: { fontSize: "24px", fontWeight: "600", color: "#1a2e4a", marginBottom: "20px" },
    doctorsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" },
    loading: { textAlign: "center", padding: "60px 20px", fontSize: "16px", color: "#6b7280" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modalContent: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "380px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "20px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    doctorAvatar: { width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(135deg, #66a8ea 0%, #1ba073 100%)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "600", margin: "0 auto" },
    detailRow: { fontSize: "15px", color: "#374151", padding: "6px 0", borderBottom: "1px solid #f3f4f6" },
    confirmModal: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "360px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "16px" },
    confirmTitle: { fontSize: "18px", fontWeight: "600", color: "#1a2e4a", margin: 0 },
    confirmText: { fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: "1.5" },
    confirmBtns: { display: "flex", gap: "10px", justifyContent: "flex-end" },
    cancelBtn: { padding: "8px 16px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    deleteBtn: { padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
};

export default About;
