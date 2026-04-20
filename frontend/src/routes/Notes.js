import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import MedicalNote from "../components/MedicalNotes";
import AddDiagnosis from "../components/AddDiagnosis";
import Prescription from "../components/Prescription";
import LabTest from "../components/LabTest";
import DocumentAttach from "../components/DocumentAttach";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [showDiagnosis, setShowDiagnosis] = useState(false);
    const [showPrescription, setShowPrescription] = useState(false);
    const [showLabTest, setShowLabTest] = useState(false);
    const [showDocument, setShowDocument] = useState(false);

    useEffect(() => { loadNotes(); }, []);

    const loadNotes = async () => {
        const response = await api.getNotes();
        if (response.success) setNotes(response.data);
        setLoading(false);
    };

    const handleDelete = (id) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const filteredNotes = notes
        .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "name") return a.title.localeCompare(b.title);
            if (sortBy === "date") return new Date(b.date) - new Date(a.date);
            return 0;
        });

    if (loading) {
        return (
            <div>
                <Navbar />
                <div style={styles.loading}>Բեռնվում է...</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>Բժշկական նշումներ</h1>
                        <p style={styles.subtitle}>Ընդամենը {notes.length} նշում</p>
                    </div>
                </div>

                <div style={styles.actions}>
                    <button style={styles.actionBtn} onClick={() => setShowDiagnosis(true)}>🩺 Ախտորոշում ավելացնել</button>
                    <button style={styles.actionBtn} onClick={() => setShowPrescription(true)}>💊 Բաղադրատոմս դուրս գրել</button>
                    <button style={styles.actionBtn} onClick={() => setShowLabTest(true)}>🧪 Լաբ. անալիզ նշանակել</button>
                    <button style={styles.actionBtn} onClick={() => setShowDocument(true)}>📎 Փաստաթուղթ կցել</button>
                </div>

                <div style={styles.controls}>
                    <input
                        type="text"
                        placeholder="Որոնել նշում..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.search}
                    />
                    <div style={styles.sortGroup}>
                        <span style={styles.sortLabel}>Դասակարգել՝</span>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
                            <option value="date">Ըստ ամսաթվի</option>
                            <option value="name">Ըստ անվան</option>
                        </select>
                    </div>
                </div>

                {showDiagnosis && <AddDiagnosis onClose={() => setShowDiagnosis(false)} onSave={(data) => console.log("Ախտորոշում՝", data)} />}
                {showPrescription && <Prescription onClose={() => setShowPrescription(false)} onSave={(data) => console.log("Բաղադրատոմս՝", data)} />}
                {showLabTest && <LabTest onClose={() => setShowLabTest(false)} onSave={(data) => console.log("Անալիզ՝", data)} />}
                {showDocument && <DocumentAttach onClose={() => setShowDocument(false)} onSave={(data) => console.log("Փաստաթուղթ՝", data)} />}

                <div style={styles.notesList}>
                    {filteredNotes.length ? (
                        filteredNotes.map((note) => (
                            <MedicalNote key={note.id} note={note} onDelete={handleDelete} />
                        ))
                    ) : (
                        <p>Նշումներ չկան</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    title: { fontSize: "32px", fontWeight: "600", color: "#1a2e4a", marginBottom: "5px" },
    subtitle: { fontSize: "14px", color: "#6b7280" },
    actions: { display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" },
    actionBtn: { padding: "9px 16px", background: "#f0f4ff", color: "#2563eb", border: "1px solid #c7d7fd", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
    controls: { display: "flex", gap: "12px", marginBottom: "24px", alignItems: "center" },
    search: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", width: "280px" },
    sortGroup: { display: "flex", alignItems: "center", gap: "8px" },
    sortLabel: { fontSize: "13px", color: "#6b7280", fontWeight: "500" },
    select: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
    notesList: { maxWidth: "800px" },
    loading: { textAlign: "center", padding: "60px 20px", fontSize: "16px", color: "#6b7280" },
};

export default Notes;
