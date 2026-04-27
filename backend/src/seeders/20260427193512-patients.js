"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("patients", [
            {
                name: "Արամ",
                surname: "Սարգսյան",
                age: 45,
                diagnosis: "Հիպերտոնիա",
                status: "active",
                email: "aram.sargsyan@example.com",
            },
            {
                name: "Լուսինե",
                surname: "Պետրոսյան",
                age: 32,
                diagnosis: "Դիաբետ",
                status: "stable",
                email: "lusine.petrosyan@example.com",
            },
            {
                name: "Գևորգ",
                surname: "Ավագյան",
                age: 58,
                diagnosis: "Միգրեն",
                status: "pending",
                email: "gevorg.avagyan@example.com",
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("patients", null, {});
    },
};
