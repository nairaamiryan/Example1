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
}

export default new API();
