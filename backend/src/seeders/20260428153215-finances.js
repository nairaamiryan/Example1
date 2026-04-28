"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("finances", [
            {
                title: "Բժշկական սարքավորումների գնում",
                description: "Նոր կարդիոգրաֆ սարքի ձեռքբերում",
                amount: 450000,
                type: "expense",
                date: "2024-06-01",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Ապահովագրական վճար",
                description: "Հիվանդների ապահովագրական ընկերությունից մուտք",
                amount: 320000,
                type: "income",
                date: "2024-05-15",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Դեղերի գնում",
                description: "Ամսական դեղապահակի համալրում",
                amount: 180000,
                type: "expense",
                date: "2024-05-01",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("finances", null, {});
    },
};
