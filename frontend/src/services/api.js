import mockData from "./mockBackend.json";
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

class API {
    async getPatients() {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/patients`,
        );
        if (!response.ok) {
            return { success: false, error: "Failed to fetch patients" };
        }
        const data = await response.json();
        return { success: true, data };
    }

    async getPatient(id) {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/patients/${id}`,
        );
        if (!response.ok) {
            return { success: false, error: "Failed to fetch patient" };
        }
        const data = await response.json();
        return { success: true, data };
    }

    async getDoctors() {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/doctors`,
        );
        if (!response.ok) {
            return { success: false, error: "Failed to fetch doctors" };
        }
        const data = await response.json();
        return { success: true, data };
    }

    async getReports() {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/reports`,
        );
        if (!response.ok) {
            return { success: false, error: "Failed to fetch reports" };
        }
        const data = await response.json();
        return { success: true, data };
    }

    async addReport(report) {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/reports`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(report),
            },
        );
        if (!response.ok) {
            return { success: false, error: "Failed to add report" };
        }
        const data = await response.json();
        return { success: true, data: data.data };
    }

    async getNotes() {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/notes`,
        );
        if (!response.ok) {
            return { success: false, error: "Failed to fetch notes" };
        }
        const data = await response.json();
        return { success: true, data };
    }

    async addNote(note) {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/notes`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(note),
            },
        );
        if (!response.ok) {
            return { success: false, error: "Failed to add note" };
        }
        const data = await response.json();
        return { success: true, data: data.data };
    }

    async getFinances() {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/finances`,
        );
        if (!response.ok) {
            return { success: false, error: "Failed to fetch finances" };
        }
        const data = await response.json();
        return { success: true, data };
    }

    async addFinance(item) {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}/api/finances`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            },
        );
        if (!response.ok) {
            return { success: false, error: "Failed to add finance" };
        }
        const data = await response.json();
        return { success: true, data: data.data };
    }

    async getAboutInfo() {
        await delay();
        return { success: true, data: mockData.aboutInfo };
    }

    async getNotifications() {
        await delay();
        return { success: true, data: mockData.notifications };
    }

    async deletePatient(id) {
        try {
            return { success: true };
        } catch {
            return { success: false };
        }
    }

    async getChartData() {
        await delay();
        return { success: true, data: mockData.statistics };
    }

    async addDoctor(doctor) {
        try {
            const newDoctor = { id: Date.now(), ...doctor };
            return { success: true, data: newDoctor };
        } catch {
            return { success: false };
        }
    }

    async addPatient(patient) {
        try {
            const newPatient = { id: Date.now(), ...patient };
            return { success: true, data: newPatient };
        } catch {
            return { success: false };
        }
    }
}

export default new API();
