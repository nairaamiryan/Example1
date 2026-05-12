import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
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
import { STATISTICS, LOADING } from "../constants";
import api from "../services/api";
const MONTHS_HY = {
    Jan: "Հնվ", Feb: "Փտր", Mar: "Մրտ", Apr: "Ապր",
    May: "Մյս", Jun: "Հնս", Jul: "Հլս", Aug: "Օգս",
    Sep: "Սպտ", Oct: "Հկտ", Nov: "Նյմ", Dec: "Դկտ",
};

const DAYS_HY = {
    Mon: "Երկ", Tue: "Երք", Wed: "Չոր", Thu: "Հնգ",
    Fri: "Ուրբ", Sat: "Շբթ", Sun: "Կիր",
    };

const PERIOD_LABELS = {
    today: "Այսօր",
    weekly: "Շաբաթ",
    monthly: "Ամիս",
    all: "Ամբողջ ժամանակ",
};

const TYPE_LABELS = {
    appointment: "Ժամադրություն",
    prescription: "Դեղատոմս",
    doctor: "Բժիշկ",
    patient: "Պացիենտ",
    system: "Համակարգ",
};

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        period: "monthly",
    });
    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {
        setLoading(true);
        const response = await api.getStatistics();
        if (response.success) {
            setData(response.data);
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

    const counts = data?.counts || {};
    const topDoctors = data?.topDoctors || [];
    const bySpecialty = data?.bySpecialty || {};
    const byStatus = data?.byStatus || {};
    const finances = data?.finances || {};
    const recentNotifications = data?.recentNotifications || [];

    const doctorsData = topDoctors.map((d) => ({
        name: d.name,
        count: d.patients,
    }));
    const specialtyData = Object.entries(bySpecialty).map(([name, value]) => ({
        name,
        value,
    }));
    const statusData = [
        { name: "Ակտիվ", value: byStatus.active || 0 },
        { name: "Կայուն", value: byStatus.stable || 0 },
        { name: "Սպասող", value: byStatus.pending || 0 },
    ];
    const getLineData = () => {
        if (!data.timeline) return [];
        if (filter.period === "today") return data.timeline.today || [];
        if (filter.period === "weekly") return data.timeline.weekly || [];
        if (filter.period === "all") return data.timeline.allTime || [];
        return data.timeline.monthly || [];
    };
    const renderCustomLabel = ({ name, percent, x, y }) => {
        if (percent < 0.005) return null;
        return (
            <text
                x={x}
                y={y}
                fill="#333"
                textAnchor={x > 300 ? "start" : "end"}
                dominantBaseline="central"
                fontSize={10}
            >
                {`${name} ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.titleRow}>
                    <h2 style={styles.containerTitle}>{STATISTICS.TITLE}</h2>
                    <button onClick={loadStatistics} style={styles.refreshBtn}>
                        🔄 Թարմացնել
                    </button>
                </div>

                {/* STAT CARDS */}
                <div style={styles.statsGrid}>
                    <StatCard
                        icon={STATISTICS.PATIENTS.ICON}
                        title={STATISTICS.PATIENTS.TITLE}
                        color={STATISTICS.PATIENTS.COLOR}
                        value={counts.patients}
                    />
                    <StatCard
                        icon={STATISTICS.DOCTORS.ICON}
                        title={STATISTICS.DOCTORS.TITLE}
                        color={STATISTICS.DOCTORS.COLOR}
                        value={counts.doctors}
                    />
                    <StatCard
                        icon={STATISTICS.APPOINTMENTS.ICON}
                        title={STATISTICS.APPOINTMENTS.TITLE}
                        color={STATISTICS.APPOINTMENTS.COLOR}
                        value={counts.reports}
                    />
                    <StatCard
                        icon={STATISTICS.DEPARTMENT.ICON}
                        title={STATISTICS.DEPARTMENT.TITLE}
                        color={STATISTICS.DEPARTMENT.COLOR}
                        value={counts.departments}
                        subtitle="ակտիվ"
                    />
                </div>

                {/* FINANCES ROW */}
                <div style={styles.financesRow}>
                    <div style={styles.financeCard}>
                        <div style={styles.financeIcon}>💰</div>
                        <div style={styles.financeLabel}>Ընդհանուր եկամուտ</div>
                        <div
                            style={{ ...styles.financeValue, color: "#16a34a" }}
                        >
                            +{finances.totalIncome?.toFixed(0)} ֏
                        </div>
                    </div>
                    <div style={styles.financeCard}>
                        <div style={styles.financeIcon}>💸</div>
                        <div style={styles.financeLabel}>Ընդհանուր ծախս</div>
                        <div
                            style={{ ...styles.financeValue, color: "#dc2626" }}
                        >
                            -{finances.totalExpense?.toFixed(0)} ֏
                        </div>
                    </div>
                    <div style={styles.financeCard}>
                        <div style={styles.financeIcon}>📊</div>
                        <div style={styles.financeLabel}>Զուտ հաշվեկշիռ</div>
                        <div
                            style={{
                                ...styles.financeValue,
                                color:
                                    finances.totalIncome -
                                        finances.totalExpense >=
                                    0
                                        ? "#16a34a"
                                        : "#dc2626",
                            }}
                        >
                            {(
                                (finances.totalIncome || 0) -
                                (finances.totalExpense || 0)
                            ).toFixed(0)}{" "}
                            ֏
                        </div>
                    </div>
                </div>

                {/* CHARTS */}
                <div style={styles.chartsSection}>
                    <h3 style={styles.sectionTitle}>📈 Գրաֆիկներ</h3>
                    <div style={styles.chartsGrid}>
                        <div style={styles.chartCard}>
                            <div style={styles.tableHeader}>
                                <h4 style={styles.chartTitle}>
                                    Բժիշկներ ըստ մասնագիտության
                                </h4>
                            </div>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={specialtyData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={75}
                                        label={renderCustomLabel}
                                        labelLine={true}
                                        fontSize={11}
                                    >
                                        {specialtyData.map((_, i) => (
                                            <Cell
                                                key={i}
                                                fill={
                                                    [
                                                        "#4a90d9",
                                                        "#27ae60",
                                                        "#e67e22",
                                                        "#8e44ad",
                                                        "#e74c3c",
                                                        "#16a085",
                                                    ][i % 6]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={styles.chartCard}>
                            <div style={styles.tableHeader}>
                                <h4 style={styles.chartTitle}>
                                    Հիվանդներ ըստ կարգավիճակի
                                </h4>
                            </div>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={75}
                                        label={renderCustomLabel}
                                        labelLine={true}
                                        fontSize={11}
                                    >
                                        {statusData.map((_, i) => (
                                            <Cell
                                                key={i}
                                                fill={
                                                    [
                                                        "#27ae60",
                                                        "#4a90d9",
                                                        "#e67e22",
                                                    ][i % 3]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={{ ...styles.chartCard, gridColumn: "1 / -1" }}>
                           <div style={styles.tableHeader}>
                            <h4 style={styles.chartTitle}>
                                       Ժամադրություններ / Հիվանդներ
                                  </h4>
                        </div>
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
                                                    setFilter({ period: key })
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
                            </div>
                            <ResponsiveContainer width="100%" height={250}>
                                           
                                <LineChart data={getLineData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tickFormatter={(val) => MONTHS_HY[val] || val} />
                                    <YAxis />
                                    <Tooltip formatter={(value, name) => [value, name]}
                                     labelFormatter={(label) => MONTHS_HY[label] || DAYS_HY[label] || label} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="appointments"
                                        stroke="#e67e22"
                                        name="Ժամադրություններ"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="patients"
                                        stroke="#4a90d9"
                                        name="Հիվանդներ"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
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
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={doctorsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="count"
                                        name="Զբաղվածության սանդղակ"
                                        fill="#4a90d9"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RECENT NOTIFICATIONS TABLE */}
                <div style={styles.tableCard}>
                    <div style={styles.tableHeader}>
                        <h3 style={styles.tableTitle}>
                            🔔 Վերջին ծանուցումները
                        </h3>
                    </div>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {[
                                    "Վերնագիր",
                                    "Հաղորդագրություն",
                                    "Տեսակ",
                                    "Ամսաթիվ",
                                ].map((h) => (
                                    <th key={h} style={styles.th}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {!recentNotifications.length ? (
                                <tr>
                                    <td colSpan={4} style={styles.empty}>
                                        Տվյալ չկա
                                    </td>
                                </tr>
                            ) : (
                                recentNotifications.map((n) => (
                                    <tr key={n.id}>
                                        <td style={styles.td}>{n.title}</td>
                                        <td style={styles.td}>{n.message}</td>
                                        <td style={styles.td}>
                                            {TYPE_LABELS[n.type] || n.type}
                                        </td>
                                        <td style={styles.td}>
                                            {new Date(
                                                n.date,
                                            ).toLocaleDateString("hy-AM")}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    container: { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" },
    filtersRow: {
        display: "flex",
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
    filterLabel: {
        fontSize: "13px",
        color: "#555",
        fontWeight: "600",
    },
    filterBtn: (active) => ({
        padding: "6px 14px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        fontSize: "13px",
        backgroundColor: active ? "#4a90d9" : "#e0e0e0",
        color: active ? "#fff" : "#333",
    }),
    titleRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
    },
    containerTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#1a2e4a",
        margin: 0,
    },
    refreshBtn: {
        padding: "8px 16px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "32px",
    },
    financesRow: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "32px",
    },
    financeCard: {
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        textAlign: "center",
    },
    financeIcon: { fontSize: "28px", marginBottom: "8px" },
    financeLabel: { fontSize: "13px", color: "#6b7280", marginBottom: "6px" },
    financeValue: { fontSize: "22px", fontWeight: "700" },
    chartsSection: { marginTop: "40px", marginBottom: "40px" },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#1a2e4a",
        marginBottom: "20px",
    },
    chartsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "32px",
    },
    chartCard: {
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
    },
    chartTitle: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#1a2e4a",
        margin: 0,
    },
    tableCard: {
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        marginTop: "32px",
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
    loading: { textAlign: "center", padding: "60px" },
};

export default Home;
