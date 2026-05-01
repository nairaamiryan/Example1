const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}`;

class API {
    async getPatients() {
        const response = await fetch(`${BASE_URL}/api/patients`);
        if (!response.ok) return { success: false, error: "Failed to fetch patients" };
        const data = await response.json();
        return { success: true, data };
    }

    async addPatient(patient) {
        const response = await fetch(`${BASE_URL}/api/patients`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient),
        });
        if (!response.ok) return { success: false, error: "Failed to add patient" };
        const data = await response.json();
        return { success: true, data };
    }

    async updatePatient(id, patient) {
        const response = await fetch(`${BASE_URL}/api/patients/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient),
        });
        if (!response.ok) return { success: false, error: "Failed to update patient" };
        const data = await response.json();
        return { success: true, data };
    }

    async deletePatient(id) {
        const response = await fetch(`${BASE_URL}/api/patients/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) return { success: false, error: "Failed to delete patient" };
        return { success: true };
    }

    async getDoctors() {
        const response = await fetch(`${BASE_URL}/api/doctors`);
        if (!response.ok) return { success: false, error: "Failed to fetch doctors" };
        const data = await response.json();
        return { success: true, data };
    }

    async addDoctor(doctor) {
        const response = await fetch(`${BASE_URL}/api/doctors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doctor),
        });
        if (!response.ok) return { success: false, error: "Failed to add doctor" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateDoctor(id, doctor) {
        const response = await fetch(`${BASE_URL}/api/doctors/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doctor),
        });
        if (!response.ok) return { success: false, error: "Failed to update doctor" };
        const data = await response.json();
        return { success: true, data };
    }

    async deleteDoctor(id) {
        const response = await fetch(`${BASE_URL}/api/doctors/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) return { success: false, error: "Failed to delete doctor" };
        return { success: true };
    }

    async getReports() {
        const response = await fetch(`${BASE_URL}/api/reports`);
        if (!response.ok) return { success: false, error: "Failed to fetch reports" };
        const data = await response.json();
        return { success: true, data };
    }

    async addReport(report) {
        const response = await fetch(`${BASE_URL}/api/reports`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report),
        });
        if (!response.ok) return { success: false, error: "Failed to add report" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateReport(id, report) {
        const response = await fetch(`${BASE_URL}/api/reports/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report),
        });
        if (!response.ok) return { success: false, error: "Failed to update report" };
        const data = await response.json();
        return { success: true, data };
    }

    async deleteReport(id) {
        const response = await fetch(`${BASE_URL}/api/reports/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) return { success: false, error: "Failed to delete report" };
        return { success: true };
    }

    async getNotes() {
        const response = await fetch(`${BASE_URL}/api/notes`);
        if (!response.ok) return { success: false, error: "Failed to fetch notes" };
        const data = await response.json();
        return { success: true, data };
    }

    async addNote(note) {
        const response = await fetch(`${BASE_URL}/api/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
        });
        if (!response.ok) return { success: false, error: "Failed to add note" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateNote(id, note) {
        const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
        });
        if (!response.ok) return { success: false, error: "Failed to update note" };
        const data = await response.json();
        return { success: true, data };
    }

    async deleteNote(id) {
        const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) return { success: false, error: "Failed to delete note" };
        return { success: true };
    }

    async getFinances() {
        const response = await fetch(`${BASE_URL}/api/finances`);
        if (!response.ok) return { success: false, error: "Failed to fetch finances" };
        const data = await response.json();
        return { success: true, data };
    }

    async addFinance(item) {
        const response = await fetch(`${BASE_URL}/api/finances`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        if (!response.ok) return { success: false, error: "Failed to add finance" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateFinance(id, item) {
        const response = await fetch(`${BASE_URL}/api/finances/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        if (!response.ok) return { success: false, error: "Failed to update finance" };
        const data = await response.json();
        return { success: true, data };
    }

    async deleteFinance(id) {
        const response = await fetch(`${BASE_URL}/api/finances/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) return { success: false, error: "Failed to delete finance" };
        return { success: true };
    }
}

export default new API();
