import mockData from "./mockBackend.json";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

class API {
    async getPatients() {
        await delay();
        return { success: true, data: mockData.patients };
    }

    async getPatient(id) {
        await delay();
        const patient = mockData.patients.find((p) => p.id === parseInt(id));
        return patient
            ? { success: true, data: patient }
            : { success: false, error: "Patient not found" };
    }

    async getDoctors() {
        await delay();
        return { success: true, data: mockData.doctors };
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
}
deletePatient: async (id) => {
    try {
        const res = await fetch(`/patients/${id}`, {
            method: "DELETE",
        });

        return { success: true };
    } catch {
        return { success: false };
    }
}
