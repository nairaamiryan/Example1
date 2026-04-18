import React, { useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  STATISTICS,
  DEPARTMENTS,
  STATUS_OPTIONS,
  STATUS_COLORS,
} from "../constants";

const PERIOD_LABELS = { today: "Այսօր", weekly: "Շաբաթ", monthly: "Ամիս" };

const emptyAppointment = { patient: "", doctor: "", date: "", status: "Հաստատված" };
const emptyPatient = { name: "", age: "", department: DEPARTMENTS[0], date: "" };

const Home = () => {
  // KPI state
  const [counts, setCounts] = useState({
    patients: 0,
    newPatients: 0,
    doctors: 0,
    appointments: 0,
    departments: 0,
  });

  // Filter state
  const [filter, setFilter] = useState({ period: "monthly", department: "all" });

  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [apptForm, setApptForm] = useState(emptyAppointment);
  const [showApptForm, setShowApptForm] = useState(false);

  // Patients state
  const [patients, setPatients] = useState([]);
  const [patientForm, setPatientForm] = useState(emptyPatient);
  const [showPatientForm, setShowPatientForm] = useState(false);

  const handleCountChange = (key, value) => {
    setCounts((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddAppointment = () => {
    if (!apptForm.patient || !apptForm.doctor || !apptForm.date) return;
    setAppointments((prev) => [...prev, { ...apptForm, id: Date.now() }]);
    setApptForm(emptyAppointment);
    setShowApptForm(false);
  };

  const handleAddPatient = () => {
    if (!patientForm.name || !patientForm.age || !patientForm.date) return;
    setPatients((prev) => [...prev, { ...patientForm, id: Date.now() }]);
    setPatientForm(emptyPatient);
    setShowPatientForm(false);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDeletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredAppointments = appointments.filter((a) =>
    filter.department === "all" ? true : a.department === filter.department
  );
  const [chartData, setChartData] = useState({
  monthly: [
    { month: "Հուն", appointments: 0, patients: 0 },
    { month: "Փտր", appointments: 0, patients: 0 },
    { month: "Մրտ", appointments: 0, patients: 0 },
    { month: "Ապր", appointments: 0, patients: 0 },
    { month: "Մյս", appointments: 0, patients: 0 },
    { month: "Հնս", appointments: 0, patients: 0 },
    { month: "Հլս", appointments: 0, patients: 0 },
    { month: "Օգս", appointments: 0, patients: 0 },
    { month: "Սպտ", appointments: 0, patients: 0 },
    { month: "Հոկ", appointments: 0, patients: 0 },
    { month: "Նյմ", appointments: 0, patients: 0 },
    { month: "Դկտ", appointments: 0, patients: 0 },
  ],
  byDepartment: DEPARTMENTS.map((d) => ({ name: d, value: 0 })),
  topDoctors: [],
});

const [editingChart, setEditingChart] = useState(null);
const [chartInputs, setChartInputs] = useState({});

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.containerTitle}>{STATISTICS.TITLE}</h2>

        {/* KPI Cards */}
        <div style={styles.statsGrid}>
          <StatCard
            icon={STATISTICS.PATIENTS.ICON}
            title={STATISTICS.PATIENTS.TITLE}
            color={STATISTICS.PATIENTS.COLOR}
            count={counts.patients}
            subtitle={`+${counts.newPatients} այս ամիս`}
            onCountChange={(v) => handleCountChange("patients", v)}
          />
          <StatCard
            icon={STATISTICS.DOCTORS.ICON}
            title={STATISTICS.DOCTORS.TITLE}
            color={STATISTICS.DOCTORS.COLOR}
            count={counts.doctors}
            onCountChange={(v) => handleCountChange("doctors", v)}
          />
          <StatCard
            icon={STATISTICS.APPOINTMENTS.ICON}
            title={STATISTICS.APPOINTMENTS.TITLE}
            color={STATISTICS.APPOINTMENTS.COLOR}
            count={counts.appointments}
            subtitle={PERIOD_LABELS[filter.period]}
            onCountChange={(v) => handleCountChange("appointments", v)}
          />
          <StatCard
            icon={STATISTICS.DEPARTMENT.ICON}
            title={STATISTICS.DEPARTMENT.TITLE}
            color={STATISTICS.DEPARTMENT.COLOR}
            count={counts.departments}
            subtitle="ակտիվ"
            onCountChange={(v) => handleCountChange("departments", v)}
          />
        </div>

        {/* Ֆիլտրեր */}
        <div style={styles.filtersRow}>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Ժամանակահատված՝</span>
            {Object.entries(PERIOD_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter((f) => ({ ...f, period: key }))}
                style={styles.filterBtn(filter.period === key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Բաժին՝</span>
            {["all", ...DEPARTMENTS].map((d) => (
              <button
                key={d}
                onClick={() => setFilter((f) => ({ ...f, department: d }))}
                style={styles.filterBtn(filter.department === d)}
              >
                {d === "all" ? "Բոլորը" : d}
              </button>
            ))}
          </div>
        </div>

        {/* Աղյուսակներ */}
        <div style={styles.tablesGrid}>

          {/* Ժամադրություններ */}
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>📋 Վերջին ժամադրությունները</h3>
              <button
                onClick={() => setShowApptForm((v) => !v)}
                style={styles.addBtn}
              >
                {showApptForm ? "✕ Փակել" : "+ Ավելացնել"}
              </button>
            </div>

            {showApptForm && (
              <div style={styles.form}>
                <input
                  placeholder="Հիվանդի անուն"
                  value={apptForm.patient}
                  onChange={(e) => setApptForm((f) => ({ ...f, patient: e.target.value }))}
                  style={styles.input}
                />
                <input
                  placeholder="Բժիշկի անուն"
                  value={apptForm.doctor}
                  onChange={(e) => setApptForm((f) => ({ ...f, doctor: e.target.value }))}
                  style={styles.input}
                />
                <input
                  type="date"
                  value={apptForm.date}
                  onChange={(e) => setApptForm((f) => ({ ...f, date: e.target.value }))}
                  style={styles.input}
                />
                <select
                  value={apptForm.status}
                  onChange={(e) => setApptForm((f) => ({ ...f, status: e.target.value }))}
                  style={styles.input}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <button onClick={handleAddAppointment} style={styles.submitBtn}>
                  Պահպանել
                </button>
              </div>
            )}

            <table style={styles.table}>
              <thead>
                <tr>
                  {["Հիվանդ", "Բժիշկ", "Ամսաթիվ", "Կարգավիճակ", ""].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={styles.empty}>Տվյալ չկա</td>
                  </tr>
                ) : (
                  filteredAppointments.map((a) => (
                    <tr key={a.id}>
                      <td style={styles.td}>{a.patient}</td>
                      <td style={styles.td}>{a.doctor}</td>
                      <td style={styles.td}>{a.date}</td>
                      <td style={styles.td}>
                        <span style={styles.badge(STATUS_COLORS[a.status])}>{a.status}</span>
                      </td>
                      <td style={styles.td}>
                        <button onClick={() => handleDeleteAppointment(a.id)} style={styles.deleteBtn}>✕</button>
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
              <h3 style={styles.tableTitle}>🆕 Նոր գրանցված հիվանդներ</h3>
              <button
                onClick={() => setShowPatientForm((v) => !v)}
                style={styles.addBtn}
              >
                {showPatientForm ? "✕ Փակել" : "+ Ավելացնել"}
              </button>
            </div>

            {showPatientForm && (
              <div style={styles.form}>
                <input
                  placeholder="Անուն Ազգանուն"
                  value={patientForm.name}
                  onChange={(e) => setPatientForm((f) => ({ ...f, name: e.target.value }))}
                  style={styles.input}
                />
                <input
                  type="number"
                  placeholder="Տարիք"
                  value={patientForm.age}
                  onChange={(e) => setPatientForm((f) => ({ ...f, age: e.target.value }))}
                  style={styles.input}
                />
                <select
                  value={patientForm.department}
                  onChange={(e) => setPatientForm((f) => ({ ...f, department: e.target.value }))}
                  style={styles.input}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={patientForm.date}
                  onChange={(e) => setPatientForm((f) => ({ ...f, date: e.target.value }))}
                  style={styles.input}
                />
                <button onClick={handleAddPatient} style={styles.submitBtn}>
                  Պահպանել
                </button>
              </div>
            )}

            <table style={styles.table}>
              <thead>
                <tr>
                  {["Անուն", "Տարիք", "Բաժին", "Ամսաթիվ", ""].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={styles.empty}>Տվյալ չկա</td>
                  </tr>
                ) : (
                  patients.map((p) => (
                    <tr key={p.id}>
                      <td style={styles.td}>{p.name}</td>
                      <td style={styles.td}>{p.age}</td>
                      <td style={styles.td}>{p.department}</td>
                      <td style={styles.td}>{p.date}</td>
                      <td style={styles.td}>
                        <button onClick={() => handleDeletePatient(p.id)} style={styles.deleteBtn}>✕</button>
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
  );
};

const styles = {
  container: { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" },
  containerTitle: { fontSize: "24px", fontWeight: "600", color: "#1a2e4a", marginBottom: "24px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "32px" },
  filtersRow: { display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "32px", backgroundColor: "#f8f9fa", padding: "16px", borderRadius: "10px" },
  filterGroup: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" },
  filterLabel: { fontSize: "13px", color: "#555", fontWeight: "600" },
  filterBtn: (active) => ({ padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px", backgroundColor: active ? "#4a90d9" : "#e0e0e0", color: active ? "#fff" : "#333", fontWeight: active ? "600" : "400" }),
  tablesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" },
  tableCard: { backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  tableTitle: { fontSize: "16px", fontWeight: "600", color: "#1a2e4a", margin: 0 },
  addBtn: { padding: "6px 14px", backgroundColor: "#4a90d9", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px", backgroundColor: "#f8f9fa", padding: "16px", borderRadius: "10px" },
  input: { padding: "8px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", outline: "none" },
  submitBtn: { padding: "8px", backgroundColor: "#27ae60", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "10px 12px", fontSize: "12px", color: "#888", fontWeight: "600", borderBottom: "2px solid #f0f0f0", textTransform: "uppercase" },
  td: { padding: "10px 12px", fontSize: "14px", color: "#333", borderBottom: "1px solid #f5f5f5" },
  badge: (color) => ({ backgroundColor: color + "20", color: color, padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }),
  deleteBtn: { background: "none", border: "none", cursor: "pointer", color: "#e74c3c", fontSize: "16px" },
  empty: { textAlign: "center", padding: "20px", color: "#999", fontSize: "14px" },
};

export default Home;
