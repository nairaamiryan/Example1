"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("doctors", [
            {
                name: "Դավիթ",
                surname: "Կարապետյան",
                age: 45,
                email: "davit.karapetyan@example.com",
                specialty: "Կարդիոլոգ",
                patients: 24,
            },

            {
                name: "Դիանա",
                surname: "Հարությունյան",
                age: 38,
                email: "diana.harutyunyan@example.com",
                specialty: "Էնդոկրինոլոգ",
                patients: 18,
            },

            {
                name: "Աննա",
                surname: "Հակոբյան",
                age: 42,
                email: "anna.hakobyan@example.com",
                specialty: "Սրտաբան",
                patients: 10,
            },
            {
                name: "Մարինե",
                surname: "Գաբրիելյան",
                age: 36,
                email: "marine.gabrielyan@example.com",
                specialty: "Նյարդաբան",
                patients: 7,
            },
            {
                name: "Գայանե",
                surname: "Հարությունյան",
                age: 40,
                email: "gayane.harutyunyan@example.com",
                specialty: "Մանկաբույժ",
                patients: 14,
            },
            {
                name: "Լուսինե",
                surname: "Մարտիրոսյան",
                age: 34,
                email: "lusine.martirosyan@example.com",
                specialty: "Մաշկաբան",
                patients: 11,
            },
            {
                name: "Վահե",
                surname: "Վարդանյան",
                age: 41,
                email: "vahe.vardanyan@example.com",
                specialty: "Օրթոպեդ",
                patients: 8,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("doctors", null, {});
    },
};
