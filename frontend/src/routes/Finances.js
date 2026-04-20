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
    const [showInvoice, setShowInvoice] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showInsurance, setShowInsurance] = useState(false);
    const [showExport, setShowExport] = useState(false);

    useEffect(() => { loadFinances(); }, []);

    const loadFinances = async () => {
        const response = await api.getFinances();
        if (response.success) setItems(response.data);
        setLoading(false);
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
                </div>

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
                    <div style={styles.sortGroup}>
                        <span style={styles.sortLabel}>Դասակարգել՝</span>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
                            <option value="date">Ըստ ամսաթվի</option>
                            <option value="name">Ըստ անվան</option>
                        </select>
                    </div>
                </div>

                {showInvoice && <InvoiceCreate onClose={() => setShowInvoice(false)} onSave={(data) => console.log("Հաշիվ-ապրանքագիր՝", data)} />}
                {showPayment && <PaymentAccept onClose={() => setShowPayment(false)} onSave={(data) => console.log("Վճարում՝", data)} />}
                {showInsurance && <InsuranceCheck onClose={() => setShowInsurance(false)} onSave={(data) => console.log("Ապահովագրություն՝", data)} />}
                {showExport && <ExportReport onClose={() => setShowExport(false)} />}

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
    actions: { display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" },
    actionBtn: { padding: "9px 16px", background: "#f0f4ff", color: "#2563eb", border: "1px solid #c7d7fd", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
    controls: { display: "flex", gap: "12px", marginBottom: "24px", alignItems: "center" },
    search: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", width: "280px" },
    sortGroup: { display: "flex", alignItems: "center", gap: "8px" },
    sortLabel: { fontSize: "13px", color: "#6b7280", fontWeight: "500" },
    select: { padding: "9px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", cursor: "pointer" },
    list: { maxWidth: "800px" },
    loading: { textAlign: "center", padding: "60px 20px", fontSize: "16px", color: "#6b7280" },
};

export default Finances;
