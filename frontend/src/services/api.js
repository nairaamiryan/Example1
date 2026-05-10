const BASE_URL = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BASE_URL
    : `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_BASE_PORT}`;
class API {
    setToken(token) {
        this.token = token;
    }

    getHeaders() {
        return {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        };
    }
    // ✅ Updated: supports limit, offset, search
    async getPatients({ limit, offset, search } = {}) {
        const params = new URLSearchParams();
        if (limit  !== undefined) params.append("limit",  limit);
        if (offset !== undefined) params.append("offset", offset);
        if (search && search.trim() !== "") params.append("search", search.trim());

        const query = params.toString() ? `?${params.toString()}` : "";
        const response = await fetch(`${BASE_URL}/api/patients${query}`, {
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to fetch patients" };
        const data = await response.json();
        // backend returns { patients: [...], total: N }
        return { success: true, data };
    }

    async addPatient(patient) {
        const response = await fetch(`${BASE_URL}/api/patients`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(patient),
        });
        if (!response.ok) return { success: false, error: "Failed to add patient" };
        const data = await response.json();
        return { success: true, data };
    }

    async updatePatient(id, patient) {
        const response = await fetch(`${BASE_URL}/api/patients/${id}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(patient),
        });
        if (!response.ok) return { success: false, error: "Failed to update patient" };
        const data = await response.json();
        return { success: true, data };
    }

    async deletePatient(id) {
        const response = await fetch(`${BASE_URL}/api/patients/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to delete patient" };
        return { success: true };
    }

    async getDoctors() {
        const response = await fetch(`${BASE_URL}/api/doctors`, {
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to fetch doctors" };
        const data = await response.json();
        return { success: true, data };
    }

    async addDoctor(doctor) {
        const response = await fetch(`${BASE_URL}/api/doctors`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(doctor),
        });
        if (!response.ok) return { success: false, error: "Failed to add doctor" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateDoctor(id, doctor) {
        const response = await fetch(`${BASE_URL}/api/doctors/${id}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(doctor),
        });
        if (!response.ok) return { success: false, error: "Failed to update doctor" };
        const data = await response.json();
        return { success: true, data };
    }

    async deleteDoctor(id) {
        const response = await fetch(`${BASE_URL}/api/doctors/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to delete doctor" };
        return { success: true };
    }

    async getReports() {
        const response = await fetch(`${BASE_URL}/api/reports`, {
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to fetch reports" };
        const data = await response.json();
        return { success: true, data };
    }

    async addReport(report) {
        const response = await fetch(`${BASE_URL}/api/reports`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(report),
        });
        if (!response.ok) return { success: false, error: "Failed to add report" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateReport(id, report) {
        const response = await fetch(`${BASE_URL}/api/reports/${id}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(report),
        });
        if (!response.ok) return { success: false, error: "Failed to update report" };
        const data = await response.json();
        return { success: true, data };
    }

    async deleteReport(id) {
        const response = await fetch(`${BASE_URL}/api/reports/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to delete report" };
        return { success: true };
    }

    async getNotes() {
        const response = await fetch(`${BASE_URL}/api/notes`, {
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to fetch notes" };
        const data = await response.json();
        return { success: true, data };
    }

    async addNote(note) {
        const response = await fetch(`${BASE_URL}/api/notes`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(note),
        });
        if (!response.ok) return { success: false, error: "Failed to add note" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateNote(id, note) {
        const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(note),
        });
        if (!response.ok) return { success: false, error: "Failed to update note" };
        const data = await response.json();
        return { success: true, data };
    }

    async deleteNote(id) {
        const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to delete note" };
        return { success: true };
    }

    async getFinances() {
        const response = await fetch(`${BASE_URL}/api/finances`, {
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to fetch finances" };
        const data = await response.json();
        return { success: true, data };
    }

    async addFinance(item) {
        const response = await fetch(`${BASE_URL}/api/finances`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(item),
        });
        if (!response.ok) return { success: false, error: "Failed to add finance" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateFinance(id, item) {
        const response = await fetch(`${BASE_URL}/api/finances/${id}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(item),
        });
        if (!response.ok) return { success: false, error: "Failed to update finance" };
        const data = await response.json();
        return { success: true, data };
    }

    async deleteFinance(id) {
        const response = await fetch(`${BASE_URL}/api/finances/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to delete finance" };
        return { success: true };
    }

    async getStatistics() {
        const response = await fetch(`${BASE_URL}/api/home`, {
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to fetch statistics" };
        const data = await response.json();
        return { success: true, data };
    }

    async getNotifications() {
        const response = await fetch(`${BASE_URL}/api/notifications`, {
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to fetch notifications" };
        const data = await response.json();
        return { success: true, data };
    }

    async updateNotification(id, data) {
        const response = await fetch(`${BASE_URL}/api/notifications/${id}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) return { success: false, error: "Failed to update notification" };
        const result = await response.json();
        return { success: true, data: result };
    }

    async deleteNotification(id) {
        const response = await fetch(`${BASE_URL}/api/notifications/${id}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to delete notification" };
        return { success: true };
    }

    async getAboutInfo() {
        const response = await fetch(`${BASE_URL}/api/about`, {
            headers: this.getHeaders(),
        });
        if (!response.ok) return { success: false, error: "Failed to fetch about info" };
        const data = await response.json();
        return { success: true, data };
    }
}

export default new API();
