import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import FinanceItem from "../components/FinanceItem";
import InvoiceCreate from "../components/InvoiceCreate";
import PaymentAccept from "../components/PaymentAccept";
import InsuranceCheck from "../components/InsuranceCheck";
import ExportReport from "../components/ExportReport";

const Finances = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", amount: "", type: "income" });
    const [disabled, setDisabled] = useState(true);

    // ⬇️ 4 նոր modal-ների state-եր
    const [showInvoice, setShowInvoice] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showInsurance, setShowInsurance] = useState(false);
    const [showExport, setShowExport] = useState(false);

    useEffect(() => { loadFinances(); }, []);

    useEffect(() => {
        setDisabled(!formData.title || !formData.description || !formData.amount);
    }, [formData]);

    const loadFinances = async () => {
        const response = await api.getFinances();
        if (response.success) setItems(response.data);
        setLoading(false);
    };

    const addFinance = async () => {
        const res = await api.addFinance(formData);
        if (res.success) {
            setItems([...items, res.data]);
            setShowModal(false);
            setFormData({ title: "", description: "", amount: "", type: "income" });
        }
    };

    const handleDelete = (id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const filteredItems = items
        .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
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
                        <h1 style={styles.title}>Ֆինանսներ</h1>
                        <p style={styles.subtitle}>Ընդամենը {items.length} գրառում</p>
                    </div>
                    <button style={styles.addBtn} onClick={() => setShowModal(true)}>
                        + Ավելացնել գրառում
                    </button>
                </div>

                {/* ⬇️ 4 գործողությունների կոճակներ */}
                <div style={styles.actions}>
                    <button style={styles.actionBtn} onClick={() => setShowInvoice(true)}>🧾 Հաշիվ-ապրանքագիր ստեղծել</button>
                    <button style={styles.actionBtn} onClick={() => setShowPayment(true)}>💳 Վճարում ընդունել</button>
                    <button style={styles.actionBtn} onClick={() => setShowInsurance(true)}>🛡️ Ապահովագրություն ստուգել</button>
                    <button style={styles.actionBtn} onClick={() => setShowExport(true)}>⬇ Հաշվետվություն արտահանել</button>
                </div>

                <div style={styles.controls}>
                    <input
                        type="text"
                        placeholder="Որոնել..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={styles.search}
                    />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
                        <option value="date">Ըստ ամսաթվի</option>
                        <option value="name">Ըստ անվան</option>
                    </select>
                </div>

                {showModal && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modalContent}>
                            <div style={styles.modalHeader}>
                                <h2 style={styles.modalTitle}>Նոր գրառում</h2>
                                <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
                            </div>
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Վերնագիր"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <textarea
                                style={styles.textarea}
                                placeholder="Նկարագրություն"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <input
                                style={styles.input}
                                type="number"
                                placeholder="Գումար (֏)"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                            <select
                                style={styles.select}
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="income">Եկամուտ</option>
                                <option value="expense">Ծախս</option>
                            </select>
                            <button
                                style={disabled ? styles.submitBtnDisabled : styles.submitBtn}
                                disabled={disabled}
                                onClick={addFinance}
                            >
                                Ավելացնել
                            </button>
                        </div>
                    </div>
                )}

                {/* ⬇️ 4 modal-ներ */}
                {showInvoice && (
                    <InvoiceCreate
                        onClose={() => setShowInvoice(false)}
                        onSave={(data) => console.log("Հաշիվ-ապրանքագիր՝", data)}
                    />
                )}
                {showPayment && (
                    <PaymentAccept
                        onClose={() => setShowPayment(false)}
                        onSave={(data) => console.log("Վճարում՝", data)}
                    />
                )}
                {showInsurance && (
                    <InsuranceCheck
                        onClose={() => setShowInsurance(false)}
                        onSave={(data) => console.log("Ապահովագրություն՝", data)}
                    />
                )}
                {showExport && (
                    <ExportReport
                        onClose={() => setShowExport(false)}
                    />
                )}

                <div style={styles.list}>
                    {filteredItems.length ? (
                        filteredItems.map((item) => (
                            <FinanceItem key={item.id} item={item} onDelete={handleDelete} />
                        ))
                    ) : (
                        <p>Գրառումներ չկան</p>
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
    addBtn: { padding: "10px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
    actions: { display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" },
    actionBtn: { padding: "9px 16px", background: "#f0f4ff", color: "#2563eb", border: "1px solid #c7d7fd", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
    controls: { display: "flex", gap: "12px", marginBottom: "24px" },
    search: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", width: "280px" },
    select: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
    list: { maxWidth: "800px" },
    loading: { textAlign: "center", padding: "60px 20px", fontSize: "16px", color: "#6b7280" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modalContent: { backgroundColor: "#fff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: "12px" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    modalTitle: { fontSize: "20px", fontWeight: "600", color: "#1a2e4a" },
    closeBtn: { background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" },
    input: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
    textarea: { width: "90%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", minHeight: "100px", resize: "vertical" },
    submitBtn: { marginTop: "6px", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
    submitBtnDisabled: { marginTop: "6px", padding: "10px", backgroundColor: "#ccc", color: "#fff", border: "none", borderRadius: "8px", cursor: "not-allowed", fontWeight: "500" },
};

export default Finances;
