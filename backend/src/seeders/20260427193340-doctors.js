"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("doctors", [
            { name: "Դավիթ", surname: "Կարապետյան", age: 45, email: "davit.karapetyan@example.com", specialty: "Կարդիոլոգ", patients: 24, createdAt: new Date(), updatedAt: new Date() },
            { name: "Դիանա", surname: "Հարությունյան", age: 38, email: "diana.harutyunyan@example.com", specialty: "Էնդոկրինոլոգ", patients: 18, createdAt: new Date(), updatedAt: new Date() },
            { name: "Աննա", surname: "Հակոբյան", age: 42, email: "anna.hakobyan@example.com", specialty: "Կարդիոլոգ", patients: 10, createdAt: new Date(), updatedAt: new Date() },
            { name: "Մարինե", surname: "Գաբրիելյան", age: 36, email: "marine.gabrielyan@example.com", specialty: "Նյարդաբան", patients: 7, createdAt: new Date(), updatedAt: new Date() },
            { name: "Գայանե", surname: "Հարությունյան", age: 40, email: "gayane.harutyunyan@example.com", specialty: "Մանկաբույժ", patients: 14, createdAt: new Date(), updatedAt: new Date() },
            { name: "Լուսինե", surname: "Մարտիրոսյան", age: 34, email: "lusine.martirosyan@example.com", specialty: "Մաշկաբան", patients: 11, createdAt: new Date(), updatedAt: new Date() },
            { name: "Վահե", surname: "Վարդանյան", age: 41, email: "vahe.vardanyan@example.com", specialty: "Ուղղափայտաբույժ", patients: 8, createdAt: new Date(), updatedAt: new Date() },
            { name: "Արտակ", surname: "Հովհաննիսյան", age: 45, email: "artak.hovhannisyan@example.com", specialty: "Վիրաբույժ", patients: 38, createdAt: new Date(), updatedAt: new Date() },
            { name: "Անի", surname: "Պետրոսյան", age: 34, email: "ani.petrosyan@example.com", specialty: "Մաշկաբան", patients: 19, createdAt: new Date(), updatedAt: new Date() },
            { name: "Հայկ", surname: "Բաղդասարյան", age: 48, email: "hayk.baghdasaryan@example.com", specialty: "Ուրոլոգ", patients: 22, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("doctors", null, {});
    },
};
