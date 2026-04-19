import React from "react";
import Navbar from "../components/Navbar";

const Finances = () => {
    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "600", color: "#1a2e4a" }}>
                    Ֆինանսներ
                </h1>
            </div>
        </div>
    );
};

export default Finances;
