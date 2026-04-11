import React from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { STATISTICS } from "../constants";

const Home = () => {
    return (
        <div>
            <Navbar />

            <div style={styles.container}>
                <h2 style={styles.containerTitle}>{STATISTICS.TITLE}</h2>
                <div style={styles.statsGrid}>
                    <StatCard
                        icon={STATISTICS.PATIENTS.ICON}
                        title={STATISTICS.PATIENTS.TITLE}
                        color={STATISTICS.PATIENTS.COLOR}
                    />
                    <StatCard
                        icon={STATISTICS.DOCTORS.ICON}
                        title={STATISTICS.DOCTORS.TITLE}
                        color={STATISTICS.DOCTORS.COLOR}
                    />
                    <StatCard
                        icon={STATISTICS.APPOINTMENTS.ICON}
                        title={STATISTICS.APPOINTMENTS.TITLE}
                        color={STATISTICS.APPOINTMENTS.COLOR}
                    />
                    <StatCard
                        icon={STATISTICS.DEPARTMENT.ICON}
                        title={STATISTICS.DEPARTMENT.TITLE}
                        color={STATISTICS.DEPARTMENT.COLOR}
                    />
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
    containerTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "20px",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },
};

export default Home;
