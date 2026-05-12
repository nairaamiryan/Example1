import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import PatientCard from "../components/PatientCard";
import api from "../services/api";
import { LOADING, PATIENTS } from "../constants";
import AddPatientModal from "../components/AddPatientModal";
import Footer from "../components/Footer";

const LIMIT_OPTIONS = [5, 10, 20, 50];

// ── Debounce hook ───────────────────────────────────────────────
function useDebounce(value, delay = 500) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

// ── Page-numbers helper ─────────────────────────────────────────
function buildPages(current, total) {
    if (total <= 1) return [1];
    const pages = new Set([1, total, current]);
    if (current > 1) pages.add(current - 1);
    if (current < total) pages.add(current + 1);
    const sorted = [...pages].sort((a, b) => a - b);
    const result = [];
    sorted.forEach((p, i) => {
        if (i > 0 && p - sorted[i - 1] > 1) result.push("...");
        result.push(p);
    });
    return result;
}

// ───────────────────────────────────────────────────────────────
const Patients = () => {
    const [patients, setPatients]       = useState([]);
    const [total, setTotal]             = useState(0);
    const [loading, setLoading]         = useState(true);
    const [search, setSearch]           = useState("");
    const [searching, setSearching] = useState(false);
    const [statusFilter, setStatusFilter] = useState("Բոլորը");
    const [showForm, setShowForm]       = useState(false);
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: "" });

    // pagination
    const [limit, setLimit]             = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showLimitPicker, setShowLimitPicker] = useState(false);
    const limitBtnRef = useRef(null);

    const debouncedSearch = useDebounce(search, 500);
    const isSearching = debouncedSearch.trim() !== "";

    const totalPages = Math.max(1, Math.ceil(total / limit));
    const offset = (currentPage - 1) * limit;

    // ── Load ──────────────────────────────────────────────────
    const loadPatients = useCallback(async () => {
        if (patients.length === 0) {
            setLoading(true);
        } else {
            setSearching(true);
        }
        const response = await api.getPatients({
            limit,
            offset,
            search: debouncedSearch || undefined,
        });
        if (response.success) {
            setPatients(response.data.patients);
            setTotal(response.data.total);
        }
        setLoading(false);
        setSearching(false);
    }, [limit, offset, debouncedSearch]);

    useEffect(() => {
        loadPatients();
    }, [loadPatients]);

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    // Close limit picker on outside click
    useEffect(() => {
        const handler = (e) => {
            if (limitBtnRef.current && !limitBtnRef.current.contains(e.target)) {
                setShowLimitPicker(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // ── Mutations ──────────────────────────────────────────────
    const addPatient = async (patientData) => {
        const res = await api.addPatient(patientData);
        if (res.success) {
            setShowForm(false);
            loadPatients();
        }
    };

    const handleDelete = (id, name) => setDeleteModal({ open: true, id, name });

    const handleConfirmDelete = async () => {
        const response = await api.deletePatient(deleteModal.id);
        if (response.success) loadPatients();
        setDeleteModal({ open: false, id: null, name: "" });
    };

    const handleEdit = async (id, updatedData) => {
        const response = await api.updatePatient(id, updatedData);
        if (response.success) {
            setPatients((prev) =>
                prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
            );
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const response = await api.updatePatient(id, { status: newStatus });
        if (response.success) {
            setPatients((prev) =>
                prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
            );
        }
    };

    // ── Filtered list (status filter stays client-side) ────────
    const STATUS_MAP = {
        "Բոլորը": null,
        "Ակտիվ":  "active",
        "Կայուն": "stable",
        "Սպասող": "pending",
    };

    const displayedPatients = patients.filter((p) => {
        const f = STATUS_MAP[statusFilter];
        return f === null ? true : p.status === f;
    });

    // ── Loading screen ─────────────────────────────────────────
    if (loading) {
        return (
            <div>
                <Navbar />
                <div style={styles.loading}>{LOADING}</div>
            </div>
        );
    }

    // ── Render ─────────────────────────────────────────────────
    const pages = buildPages(currentPage, totalPages);

    return (
        <div>
            <Navbar />
            <div style={styles.container}>

                {/* ── Header ── */}
                <div style={styles.header}>
                    <div style={styles.stats}>
                        <span>Ընդամենը՝ {total}</span>
                        <span>Ակտիվ՝ {patients.filter((p) => p.status === "active").length}</span>
                        <span>Սպասող՝ {patients.filter((p) => p.status === "pending").length}</span>
                    </div>
                    <div>
                        <h1 style={styles.title}>{PATIENTS.TITLE}</h1>
                        <p style={styles.subtitle}>{PATIENTS.TOTAL_PATIENTS(total)}</p>
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
                            <option value="Բոլորը">Բոլորը</option>
                            <option value="Ակտիվ">Ակտիվ</option>
                            <option value="Կայուն">Կայուն</option>
                            <option value="Սպասող">Սպասող</option>
                        </select>
                        <button style={styles.addButton} onClick={() => setShowForm(true)}>
                            {PATIENTS.ADD_PATIENT}
                        </button>
                    </div>
                </div>

                {/* ── Add patient modal ── */}
                {showForm && (
                    <AddPatientModal
                        isOpen={showForm}
                        onClose={() => setShowForm(false)}
                        onSubmit={addPatient}
                    />
                )}

                {/* ── Delete confirmation modal ── */}
                {deleteModal.open && (
                    <div style={styles.overlay}>
                        <div style={styles.modal}>
                            <h2 style={styles.modalTitle}>Ջնջե՞լ հիվանդին</h2>
                            <p style={styles.modalText}>
                                Վստա՞հ եք, որ ցանկանում եք ջնջել{" "}
                                <strong>{deleteModal.name}</strong>-ին։
                                <br />
                                Այս գործողությունը հետ չի կարող բերվել։
                            </p>
                            <div style={styles.modalButtons}>
                                <button
                                    style={styles.cancelButton}
                                    onClick={() => setDeleteModal({ open: false, id: null, name: "" })}
                                >
                                    Չեղարկել
                                </button>
                                <button style={styles.confirmButton} onClick={handleConfirmDelete}>
                                    Այո, ջնջել
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Patient list ── */}
                <div style={styles.patientsList}>
                    {searching ? (
                        <p style={styles.empty}>Որոնում...</p>
                    ) : displayedPatients.length === 0 ? (
                        <p style={styles.empty}>Հիվանդ չի գտնվել</p>
                    ) : (
                        displayedPatients.map((patient) => (
                            <PatientCard
                                key={patient.id}
                                patient={patient}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onStatusChange={handleStatusChange}
                            />
                        ))
                    )}
                </div>

                {/* ── Pagination bar (hidden while searching) ── */}
                {total > 0 && (    
                    <div style={styles.paginationBar}>

                        {/* LEFT — limit picker */}
                        <div style={styles.limitWrapper} ref={limitBtnRef}>
                            <button
                                style={styles.limitBtn}
                                onClick={() => setShowLimitPicker((v) => !v)}
                            >
                                Ցուցադրել՝ {limit} ▲
                            </button>
                            {showLimitPicker && (
                                <div style={styles.limitPopup}>
                                    {LIMIT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt}
                                            style={{
                                                ...styles.limitOption,
                                                ...(opt === limit ? styles.limitOptionActive : {}),
                                            }}
                                            onClick={() => {
                                                setLimit(opt);
                                                setCurrentPage(1);
                                                setShowLimitPicker(false);
                                            }}
                                        >
                                            {opt} հոգի
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* CENTER — page numbers */}
                        <div style={styles.pageNumbers}>
                            <button
                                style={styles.pageArrow}
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            >
                                ‹
                            </button>

                            {pages.map((p, i) =>
                                p === "..." ? (
                                    <span key={`dots-${i}`} style={styles.dots}>…</span>
                                ) : (
                                    <button
                                        key={p}
                                        style={{
                                            ...styles.pageBtn,
                                            ...(p === currentPage ? styles.pageBtnActive : {}),
                                        }}
                                        onClick={() => setCurrentPage(p)}
                                    >
                                        {p}
                                    </button>
                                )
                            )}

                            <button
                                style={styles.pageArrow}
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            >
                                ›
                            </button>
                        </div>

                        {/* RIGHT — spacer to keep center truly centered */}
                        <div style={{ width: 130 }} />
                    </div>
                )}
            </div>
             <Footer />
        </div>
    );
};

// ── Styles ──────────────────────────────────────────────────────
const styles = {
    container:    { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" },
    stats:        { display: "flex", gap: "20px", marginBottom: "20px", fontSize: "14px", color: "#6b7280" },
    select:       { padding: "10px", borderRadius: "8px", border: "1px solid #e5e7eb" },
    header:       { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
    title:        { fontSize: "32px", fontWeight: "600", color: "#1a2e4a", marginBottom: "5px" },
    subtitle:     { fontSize: "14px", color: "#6b7280" },
    addButton:    { padding: "12px 24px", background: "#2563a8", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer" },
    patientsList: { maxWidth: "800px" },
    search:       { padding: "10px 15px", borderRadius: "8px", border: "1px solid #e5e7eb", width: "250px" },
    right:        { display: "flex", gap: "10px", alignItems: "center" },
    loading:      { textAlign: "center", padding: "60px 20px", fontSize: "16px", color: "#6b7280" },
    empty:        { color: "#9ca3af", fontSize: "14px", marginTop: "20px" },
    overlay:      { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal:        { background: "white", borderRadius: "16px", padding: "32px 28px", maxWidth: "400px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" },
    modalTitle:   { fontSize: "20px", fontWeight: "700", color: "#1a2e4a", marginBottom: "12px" },
    modalText:    { fontSize: "14px", color: "#6b7280", lineHeight: "1.6", marginBottom: "28px" },
    modalButtons: { display: "flex", gap: "12px", justifyContent: "flex-end" },
    cancelButton: { padding: "10px 20px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "white", color: "#374151", fontSize: "14px", fontWeight: "500", cursor: "pointer" },
    confirmButton:{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "#ef4444", color: "white", fontSize: "14px", fontWeight: "600", cursor: "pointer" },

    // pagination bar
    paginationBar:{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", maxWidth: "800px" },

    // limit picker
    limitWrapper: { position: "relative" },
    limitBtn:     { padding: "8px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "white", fontSize: "13px", color: "#374151", cursor: "pointer" },
    limitPopup:   { position: "absolute", bottom: "calc(100% + 8px)", left: 0, background: "white", border: "1px solid #e5e7eb", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", overflow: "hidden", zIndex: 100 },
    limitOption:  { display: "block", width: "100%", padding: "10px 20px", border: "none", background: "white", textAlign: "left", fontSize: "13px", color: "#374151", cursor: "pointer" },
    limitOptionActive: { background: "#eff6ff", color: "#2563a8", fontWeight: "600" },

    // page numbers
    pageNumbers:  { display: "flex", alignItems: "center", gap: "4px" },
    pageBtn:      { minWidth: "36px", height: "36px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "white", color: "#374151", fontSize: "13px", cursor: "pointer" },
    pageBtnActive:{ background: "#2563a8", color: "white", border: "none", fontWeight: "600" },
    pageArrow:    { minWidth: "36px", height: "36px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "white", color: "#374151", fontSize: "18px", cursor: "pointer", lineHeight: 1 },
    dots:         { padding: "0 4px", color: "#9ca3af", fontSize: "14px" },
};

export default Patients;
