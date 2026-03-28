import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import api from "../services/api";
import { LOADING, ABOUT } from "../constants";

const About = () => {
    const [aboutInfo, setAboutInfo] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <div style={styles.infoCard}>
                        <div style={styles.infoIcon}>{ABOUT.FOUNDED.ICON}</div>
                        <div style={styles.infoLabel}>
                            {ABOUT.FOUNDED.LABEL}
                        </div>
                        <div style={styles.infoValue}>{aboutInfo.founded}</div>
                    </div>
                    <div style={styles.infoCard}>
                        <div style={styles.infoIcon}>{ABOUT.STAFF.ICON}</div>
                        <div style={styles.infoLabel}>{ABOUT.STAFF.LABEL}</div>
                        <div style={styles.infoValue}>{aboutInfo.staff}</div>
                    </div>
                </div>

                <h2 style={styles.doctors}>{ABOUT.STAFF.LABEL}</h2>
                <div style={styles.doctorsGrid}>
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
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
    title: {
        fontSize: "32px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "15px",
    },
    description: {
        fontSize: "16px",
        color: "#6b7280",
        marginBottom: "30px",
        lineHeight: "1.6",
    },
    infoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "50px",
    },
    infoCard: {
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    infoIcon: {
        fontSize: "32px",
        marginBottom: "10px",
    },
    infoLabel: {
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "8px",
    },
    infoValue: {
        fontSize: "28px",
        fontWeight: "600",
        color: "#1a2e4a",
    },
    doctors: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "25px",
    },
    doctorsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
    },
    loading: {
        textAlign: "center",
        padding: "60px 20px",
        fontSize: "16px",
        color: "#6b7280",
    },
};

export default About;
