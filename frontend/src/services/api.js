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
        await delay();
        return { success: true, data: mockData.reports };
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
    async addReport(report) {
        try {
            const newReport = { id: Date.now(), ...report };
            return { success: true, data: newReport };
        } catch {
            return { success: false };
        }
    }
    async getNotes() {
        await delay();
        return { success: true, data: mockData.notes ?? [] };
    }
    async addNote(note) {
        try {
            const newNote = { id: Date.now(), date: new Date().toISOString(), ...note };
            return { success: true, data: newNote };
        } catch {
            return { success: false };
        }
    }
    async getFinances() {
        await delay();
        return { success: true, data: mockData.finances ?? [] };
    }
    async addFinance(item) {
        try {
            const newItem = { id: Date.now(), date: new Date().toISOString(), ...item };
            return { success: true, data: newItem };
        } catch {
            return { success: false };
        }
    }
}
export default new API();
