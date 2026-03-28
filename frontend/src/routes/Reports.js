import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Report from "../components/Report";
import { REPORTS, LOADING } from "../constants";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        const response = await api.getReports();
        if (response.success) {
            setReports(response.data);
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
                <h1 style={styles.title}>{REPORTS.TITLE}</h1>
                {reports.length ? (
                    <div>
                        <p style={styles.subtitle}>
                            {REPORTS.TOTAL_REPORTS(reports.length)}
                        </p>

                        <div style={styles.reportsList}>
                            {reports.map((report) => (
                                <Report key={report.id} report={report} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p> {REPORTS.EMPTY_REPORTS}</p>
                )}
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
        marginBottom: "5px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#6b7280",
    },
    reportsList: {
        maxWidth: "800px",
    },
    loading: {
        textAlign: "center",
        padding: "60px 20px",
        fontSize: "16px",
        color: "#6b7280",
    },
};

export default Reports;
