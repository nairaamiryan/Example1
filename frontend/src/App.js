import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./routes/Home";
import About from "./routes/About";
import Patients from "./routes/Patients";
import Reports from "./routes/Reports";
import Notifications from "./routes/Notifications";
import Finances from "./routes/Finances";
import Notes from "./routes/Notes";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import api from "./services/api";
import "./App.css";

function App() {
    const {
        getAccessTokenSilently,
        isAuthenticated,
        isLoading,
        loginWithRedirect,
    } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) return;
        const setToken = async () => {
            const token = await getAccessTokenSilently();
            api.setToken(token);
        };
        setToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading) {
        return (
            <div style={loadingStyles.container}>
                <div style={loadingStyles.spinner} />
                <p style={loadingStyles.text}>Բեռնվում է...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div style={loginStyles.container}>
                <div style={loginStyles.card}>
                    <h1 style={loginStyles.title}>Բժշկական համակարգ</h1>
                    <p style={loginStyles.subtitle}>
                        Մուտք գործելու համար հաստատեք ինքնությունը
                    </p>
                    <button
                        style={loginStyles.button}
                        onClick={() => loginWithRedirect()}
                    >
                        Մուտք գործել
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <div className="app">
                <Navbar>
                    <Routes>
                        <Route
                            path="/"
                            element={<ProtectedRoute component={Home} />}
                        />
                        <Route
                            path="/notifications"
                            element={<ProtectedRoute component={Notifications} />}
                        />
                        <Route
                            path="/patients"
                            element={<ProtectedRoute component={Patients} />}
                        />
                        <Route
                            path="/reports"
                            element={<ProtectedRoute component={Reports} />}
                        />
                        <Route
                            path="/about"
                            element={<ProtectedRoute component={About} />}
                        />
                        <Route
                            path="/finances"
                            element={<ProtectedRoute component={Finances} />}
                        />
                        <Route
                            path="/notes"
                            element={<ProtectedRoute component={Notes} />}
                        />
                    </Routes>
                </Navbar>
            </div>
        </Router>
    );
}

const loadingStyles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f4f8",
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "4px solid #e2e8f0",
        borderTop: "4px solid #1a2e4a",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
    text: { marginTop: "16px", color: "#64748b", fontSize: "15px" },
};

const loginStyles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f4f8",
    },
    card: {
        background: "white",
        padding: "48px 40px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "360px",
        width: "100%",
    },
    title: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#1a2e4a",
        marginBottom: "8px",
    },
    subtitle: { fontSize: "14px", color: "#64748b", marginBottom: "32px" },
    button: {
        background: "#1a2e4a",
        color: "white",
        border: "none",
        padding: "12px 32px",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        width: "100%",
        transition: "background 0.2s",
    },
};

export default App;
