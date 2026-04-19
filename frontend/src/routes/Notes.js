import React from "react";
import Navbar from "../components/Navbar";

const Notes = () => {
    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "600", color: "#1a2e4a" }}>
                    Նշումներ
                </h1>
            </div>
        </div>
    );
};

export default Notes;
