"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        const doctors = await queryInterface.sequelize.query(
            `SELECT id, specialty FROM doctors;`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        const specialtyMap = {
            "Հիպերտոնիա": "Կարդիոլոգ",
            "Դիաբետ": "Էնդոկրինոլոգ",
            "Միգրեն": "Նյարդաբան",
            "Արթրիտ": "Ուղղափայտաբույժ",
            "Ինսուլտ": "Նյարդաբան",
            "Ասթմա": "Թերապևտ",
            "Սրտի իշեմիա": "Կարդիոլոգ",
            "Թիրոիդ": "Էնդոկրինոլոգ",
            "Երիկամային անբավարարություն": "Ուրոլոգ",
        };

        const therapistId = doctors.find(d => d.specialty === "Թերապևտ")?.id || doctors[0].id;

        const getDoctorId = (diagnosis) => {
            const spec = specialtyMap[diagnosis];
            if (spec) {
                const doc = doctors.find(d => d.specialty === spec);
                if (doc) return doc.id;
            }
            return therapistId;
        };

        await queryInterface.bulkInsert("patients", [
            { id: "AA000001", name: "Արամ", surname: "Սարգսյան", age: 45, diagnosis: "Հիպերտոնիա", status: "active", email: "aram.sargsyan@example.com", doctorId: getDoctorId("Հիպերտոնիա"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000002", name: "Լուսինե", surname: "Պետրոսյան", age: 32, diagnosis: "Դիաբետ", status: "stable", email: "lusine.petrosyan@example.com", doctorId: getDoctorId("Դիաբետ"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000003", name: "Գևորգ", surname: "Ավագյան", age: 58, diagnosis: "Միգրեն", status: "pending", email: "gevorg.avagyan@example.com", doctorId: getDoctorId("Միգրեն"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000004", name: "Սոնա", surname: "Մելքոնյան", age: 41, diagnosis: "Արթրիտ", status: "stable", email: "sona.melkonyan@example.com", doctorId: getDoctorId("Արթրիտ"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000005", name: "Տիգրան", surname: "Կարապետյան", age: 63, diagnosis: "Ինսուլտ", status: "active", email: "tigran.karapetyan@example.com", doctorId: getDoctorId("Ինսուլտ"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000006", name: "Անուշ", surname: "Դավթյան", age: 35, diagnosis: "Միգրեն", status: "pending", email: "anush.davtyan@example.com", doctorId: getDoctorId("Միգրեն"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000007", name: "Հրանտ", surname: "Ասատրյան", age: 52, diagnosis: "Երիկամային անբավարարություն", status: "active", email: "hrant.asatryan@example.com", doctorId: getDoctorId("Երիկամային անբավարարություն"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000008", name: "Նարինե", surname: "Ղազարյան", age: 29, diagnosis: "Ասթմա", status: "stable", email: "narine.ghazaryan@example.com", doctorId: getDoctorId("Ասթմա"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000009", name: "Վարդան", surname: "Հակոբյան", age: 47, diagnosis: "Սրտի իշեմիա", status: "active", email: "vardan.hakobyan@example.com", doctorId: getDoctorId("Սրտի իշեմիա"), createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000010", name: "Մարիամ", surname: "Գրիգորյան", age: 38, diagnosis: "Թիրոիդ", status: "pending", email: "mariam.grigoryan@example.com", doctorId: getDoctorId("Թիրոիդ"), createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("patients", null, {});
    },
};
