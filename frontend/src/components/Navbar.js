import React from "react";
import { Link } from "react-router-dom";
import { NAVBAR } from "../constants";

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>{NAVBAR.TITLE}</div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>
                    {NAVBAR.HOME}
                </Link>
                <Link to="/patients" style={styles.link}>
                    {NAVBAR.PATIENTS}
                </Link>
                <Link to="/reports" style={styles.link}>
                    {NAVBAR.REPORTS}
                </Link>
                <Link to="/about" style={styles.link}>
                    {NAVBAR.ABOUT}
                </Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#1a2e4a",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    logo: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    links: {
        display: "flex",
        gap: "25px",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "14px",
        transition: "opacity 0.2s",
    },
};

export default Navbar;
