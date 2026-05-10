"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("patients", [
            { id: "AA000001", name: "Արամ", surname: "Սարգսյան", age: 45, diagnosis: "Հիպերտոնիա", status: "active", email: "aram.sargsyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000002", name: "Լուսինե", surname: "Պետրոսյան", age: 32, diagnosis: "Դիաբետ", status: "stable", email: "lusine.petrosyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000003", name: "Գևորգ", surname: "Ավագյան", age: 58, diagnosis: "Միգրեն", status: "pending", email: "gevorg.avagyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000004", name: "Սոնա", surname: "Մելքոնյան", age: 41, diagnosis: "Արթրիտ", status: "stable", email: "sona.melkonyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000005", name: "Տիգրան", surname: "Կարապետյան", age: 63, diagnosis: "Ինսուլտ", status: "active", email: "tigran.karapetyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000006", name: "Անուշ", surname: "Դավթյան", age: 35, diagnosis: "Միգրեն", status: "pending", email: "anush.davtyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000007", name: "Հրանտ", surname: "Ասատրյան", age: 52, diagnosis: "Երիկամային անբավարարություն", status: "active", email: "hrant.asatryan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000008", name: "Նարինե", surname: "Ղազարյան", age: 29, diagnosis: "Ասթմա", status: "stable", email: "narine.ghazaryan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000009", name: "Վարդան", surname: "Հակոբյան", age: 47, diagnosis: "Սրտի իշեմիա", status: "active", email: "vardan.hakobyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { id: "AA000010", name: "Մարիամ", surname: "Գրիգորյան", age: 38, diagnosis: "Թիրոիդ", status: "pending", email: "mariam.grigoryan@example.com", createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("patients", null, {});
    },
};
