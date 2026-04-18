import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { STATISTICS, DEPARTMENTS, LOADING } from "../constants";

import api from "../services/api";

const PERIOD_LABELS = { today: "Այսօր", weekly: "Շաբաթ", monthly: "Ամիս" };

const Home = () => {
    const [chartData, setChartData] = useState({
        monthly: [],
        byDepartment: [],
        topDoctors: [],
    });

    // Filter state
    const [filter, setFilter] = useState({
        period: "monthly",
        department: "all",
    });

    const [loading, setLoading] = useState(true);
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    useEffect(() => {
        loadChartData();
    }, []);

    const loadChartData = async () => {
        setLoading(true);
        const response = await api.getChartData(filter);
        if (response.success) {
            setChartData(response.data);
        }
        setLoading(false);
    };

    const doctorsData = chartData.topDoctors.map((d) => ({
        name: d.name,
        count: d.patients,
    }));

    const appointmentsData = chartData.appointments?.map((a) => ({
        id: a.id,
        patientName: a.patientName,
        doctorName: a.doctorName,
        date: formatDate(a.date),
        department: a.department,
    }));

    const counts = chartData.counts || {};
    const pieData = chartData.byDepartment.map((d) => ({
        name: d.department,
        value: d.patients,
    }));

    return (
        <div>
            <Navbar />
            {loading ? (
                <div style={styles.loading}>{LOADING}</div>
            ) : (
                <div style={styles.container}>
                    <h2 style={styles.containerTitle}>{STATISTICS.TITLE}</h2>

                    {/* KPI Cards */}
                    <div style={styles.statsGrid}>
                        <StatCard
                            icon={STATISTICS.PATIENTS.ICON}
                            title={STATISTICS.PATIENTS.TITLE}
                            color={STATISTICS.PATIENTS.COLOR}
                            value={counts?.patients}
                            subtitle={`+${counts?.newPatients} այս ամիս`}
                        />
                        <StatCard
                            icon={STATISTICS.DOCTORS.ICON}
                            title={STATISTICS.DOCTORS.TITLE}
                            color={STATISTICS.DOCTORS.COLOR}
                            value={counts?.doctors}
                        />
                        <StatCard
                            icon={STATISTICS.APPOINTMENTS.ICON}
                            title={STATISTICS.APPOINTMENTS.TITLE}
                            color={STATISTICS.APPOINTMENTS.COLOR}
                            value={counts?.appointments}
                            subtitle={PERIOD_LABELS[filter.period]}
                        />
                        <StatCard
                            icon={STATISTICS.DEPARTMENT.ICON}
                            title={STATISTICS.DEPARTMENT.TITLE}
                            color={STATISTICS.DEPARTMENT.COLOR}
                            value={counts?.departments}
                            subtitle="ակտիվ"
                        />
                    </div>

                    {/* Ֆիլտրեր */}
                    <div style={styles.filtersRow}>
                        <div style={styles.filterGroup}>
                            <span style={styles.filterLabel}>
                                Ժամանակահատված՝
                            </span>
                            {Object.entries(PERIOD_LABELS).map(
                                ([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() =>
                                            setFilter((f) => ({
                                                ...f,
                                                period: key,
                                            }))
                                        }
                                        style={styles.filterBtn(
                                            filter.period === key,
                                        )}
                                    >
                                        {label}
                                    </button>
                                ),
                            )}
                        </div>
                        <div style={styles.filterGroup}>
                            <span style={styles.filterLabel}>Բաժին՝</span>
                            {["all", ...DEPARTMENTS].map((d) => (
                                <button
                                    key={d}
                                    onClick={() =>
                                        setFilter((f) => ({
                                            ...f,
                                            department: d,
                                        }))
                                    }
                                    style={styles.filterBtn(
                                        filter.department === d,
                                    )}
                                >
                                    {d === "all" ? "Բոլորը" : d}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Աղյուսակներ */}
                    <div style={styles.tablesGrid}>
                        {/* Գրաֆիկներ */}
                        <div style={styles.chartsSection}>
                            <h3 style={styles.sectionTitle}>📈 Գրաֆիկներ</h3>
                            <div style={styles.chartsGrid}>
                                {/* LineChart — ամսական դինամիկա */}
                                <div style={styles.chartCard}>
                                    <div style={styles.tableHeader}>
                                        <h4 style={styles.chartTitle}>
                                            Ժամադրություններ / Հիվանդներ ըստ
                                            ամիսների
                                        </h4>

                                        <ResponsiveContainer
                                            width="100%"
                                            height={250}
                                        >
                                            <LineChart data={chartData.monthly}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="appointments"
                                                    stroke="#e67e22"
                                                    name="Ժամադրություններ"
                                                    strokeWidth={2}
                                                    dot={{ r: 4 }}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="patients"
                                                    stroke="#4a90d9"
                                                    name="Հիվանդներ"
                                                    strokeWidth={2}
                                                    dot={{ r: 4 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* PieChart — ըստ բաժինների */}
                                    <div style={styles.chartCard}>
                                        <div style={styles.tableHeader}>
                                            <h4 style={styles.chartTitle}>
                                                Հիվանդներ ըստ բաժինների
                                            </h4>
                                        </div>

                                        <ResponsiveContainer
                                            width="100%"
                                            height={250}
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={90}
                                                    label={({
                                                        name,
                                                        percent,
                                                    }) =>
                                                        `${name} ${(percent * 100).toFixed(0)}%`
                                                    }
                                                >
                                                    {pieData.map((_, i) => (
                                                        <Cell
                                                            key={i}
                                                            fill={
                                                                [
                                                                    "#4a90d9",
                                                                    "#27ae60",
                                                                    "#e67e22",
                                                                    "#8e44ad",
                                                                ][i % 4]
                                                            }
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* BarChart — ամենաբանուկ բժիշկներ */}
                                    <div
                                        style={{
                                            ...styles.chartCard,
                                            gridColumn: "1 / -1",
                                        }}
                                    >
                                        <div style={styles.tableHeader}>
                                            <h4 style={styles.chartTitle}>
                                                Ամենաբանուկ բժիշկները
                                            </h4>
                                        </div>

                                        <ResponsiveContainer
                                            width="100%"
                                            height={250}
                                        >
                                            <BarChart data={doctorsData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar
                                                    dataKey="count"
                                                    name="Ժամադրություններ"
                                                    fill="#4a90d9"
                                                    radius={[6, 6, 0, 0]}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                            {/* Ժամադրություններ */}
                            <div style={styles.tableCard}>
                                <div style={styles.tableHeader}>
                                    <h3 style={styles.tableTitle}>
                                        📋 Վերջին ժամադրությունները
                                    </h3>
                                </div>

                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            {["Հիվանդ", "Բժիշկ", "Ամսաթիվ"].map(
                                                (h) => (
                                                    <th
                                                        key={h}
                                                        style={styles.th}
                                                    >
                                                        {h}
                                                    </th>
                                                ),
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointmentsData?.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    style={styles.empty}
                                                >
                                                    Տվյալ չկա
                                                </td>
                                            </tr>
                                        ) : (
                                            appointmentsData?.map((a) => (
                                                <tr key={a.id}>
                                                    <td style={styles.td}>
                                                        {a.patientName}
                                                    </td>
                                                    <td style={styles.td}>
                                                        {a.doctorName}
                                                    </td>
                                                    <td style={styles.td}>
                                                        {a.date}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Նոր հիվանդներ */}
                            <div style={styles.tableCard}>
                                <div style={styles.tableHeader}>
                                    <h3 style={styles.tableTitle}>
                                        🆕 Նոր գրանցված հիվանդներ
                                    </h3>
                                </div>

                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            {[
                                                "Անուն",
                                                "Տարիք",
                                                "Բաժին",
                                                "Ամսաթիվ",
                                                "",
                                            ].map((h) => (
                                                <th key={h} style={styles.th}>
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chartData?.newPatients?.length ===
                                        0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    style={styles.empty}
                                                >
                                                    Տվյալ չկա
                                                </td>
                                            </tr>
                                        ) : (
                                            chartData?.newPatients?.map((p) => (
                                                <tr key={p.id}>
                                                    <td style={styles.td}>
                                                        {p.name}
                                                    </td>
                                                    <td style={styles.td}>
                                                        {p.age}
                                                    </td>
                                                    <td style={styles.td}>
                                                        {p.department}
                                                    </td>
                                                    <td style={styles.td}>
                                                        {formatDate(
                                                            p.dateRegistered,
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" },
    containerTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "24px",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "32px",
    },
    filtersRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        marginBottom: "32px",
        backgroundColor: "#f8f9fa",
        padding: "16px",
        borderRadius: "10px",
    },
    filterGroup: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
    },
    filterLabel: { fontSize: "13px", color: "#555", fontWeight: "600" },
    filterBtn: (active) => ({
        padding: "6px 14px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        fontSize: "13px",
        backgroundColor: active ? "#4a90d9" : "#e0e0e0",
        color: active ? "#fff" : "#333",
        fontWeight: active ? "600" : "400",
    }),
    appointment: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "10px",
    },
    tablesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
    },
    tableCard: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    tableHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
    },
    tableTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#1a2e4a",
        margin: 0,
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
        textAlign: "left",
        padding: "10px 12px",
        fontSize: "12px",
        color: "#888",
        fontWeight: "600",
        borderBottom: "2px solid #f0f0f0",
        textTransform: "uppercase",
    },
    td: {
        padding: "10px 12px",
        fontSize: "14px",
        color: "#333",
        borderBottom: "1px solid #f5f5f5",
    },
    empty: {
        textAlign: "center",
        padding: "20px",
        color: "#999",
        fontSize: "14px",
    },
    chartsSection: { marginTop: "40px" },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "20px",
    },
    chartsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
    },
    chartCard: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    chartTitle: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#1a2e4a",
        margin: 0,
    },
    chartForm: {
        backgroundColor: "#f8f9fa",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    loading: {
        textAlign: "center",
        padding: "60px",
    },
};
export default Home;
