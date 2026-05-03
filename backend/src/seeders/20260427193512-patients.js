"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("patients", [
            { name: "Արամ", surname: "Սարգսյան", age: 45, diagnosis: "Հիպերտոնիա", status: "active", email: "aram.sargsyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Լուսինե", surname: "Պետրոսյան", age: 32, diagnosis: "Դիաբետ", status: "stable", email: "lusine.petrosyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Գևորգ", surname: "Ավագյան", age: 58, diagnosis: "Միգրեն", status: "pending", email: "gevorg.avagyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Սոնա", surname: "Մելքոնյան", age: 41, diagnosis: "Արթրիտ", status: "stable", email: "sona.melkonyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Տիգրան", surname: "Կարապետյան", age: 63, diagnosis: "Ինսուլտ", status: "active", email: "tigran.karapetyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Անուշ", surname: "Դավթյան", age: 35, diagnosis: "Միգրեն", status: "pending", email: "anush.davtyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Հրանտ", surname: "Ասատրյան", age: 52, diagnosis: "Երիկամային անբավարարություն", status: "active", email: "hrant.asatryan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Նարինե", surname: "Ղազարյան", age: 29, diagnosis: "Ասthma", status: "stable", email: "narine.ghazaryan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Վարդան", surname: "Հակոբյան", age: 47, diagnosis: "Սրտի իշեմիա", status: "active", email: "vardan.hakobyan@example.com", createdAt: new Date(), updatedAt: new Date() },
            { name: "Մարիամ", surname: "Գրիգորյան", age: 38, diagnosis: "Թիրոիդ", status: "pending", email: "mariam.grigoryan@example.com", createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("patients", null, {});
    },
};
