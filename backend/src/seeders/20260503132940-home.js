"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("homes", [
            {
                key: "counts",
                value: JSON.stringify({
                    patients: 120,
                    doctors: 25,
                    reports: 80,
                    departments: 6,
                }),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "byStatus",
                value: JSON.stringify({
                    active: 60,
                    stable: 40,
                    pending: 20,
                }),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "bySpecialty",
                value: JSON.stringify({
                    Թերապիա: 5,
                    Վիրաբուժություն: 3,
                    Ատամնաբուժություն: 4,
                    Մանկաբուժություն: 2,
                }),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "topDoctors",
                value: JSON.stringify([
                    { name: "Dr. A", patients: 30 },
                    { name: "Dr. B", patients: 25 },
                    { name: "Dr. C", patients: 20 },
                ]),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "finances",
                value: JSON.stringify({
                    totalIncome: 500000,
                    totalExpense: 300000,
                }),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "timeline",
                value: JSON.stringify({
                    monthly: [
                        { month: "Հուն", appointments: 2, patients: 3 },
                        { month: "Փտր", appointments: 1, patients: 2 },
                        { month: "Մրտ", appointments: 2, patients: 1 },
                        { month: "Ապր", appointments: 1, patients: 2 },
                        { month: "Մյս", appointments: 23, patients: 11 },
                        { month: "Հնս", appointments: 2, patients: 12 },
                        { month: "Հլս", appointments: 1, patients: 1 },
                        { month: "Օգս", appointments: 2, patients: 1 },
                        { month: "Սպտ", appointments: 1, patients: 10 },
                        { month: "Հոկ", appointments: 21, patients: 15 },
                        { month: "Նյմ", appointments: 12, patients: 8 },
                        { month: "Դկտ", appointments: 5, patients: 1 },
                    ],
                    weekly: [
                        { month: "Երկ", appointments: 8, patients: 5 },
                        { month: "Երք", appointments: 12, patients: 9 },
                        { month: "Չոր", appointments: 6, patients: 4 },
                        { month: "Հնգ", appointments: 15, patients: 11 },
                        { month: "Ուրբ", appointments: 10, patients: 7 },
                        { month: "Շաբ", appointments: 4, patients: 3 },
                        { month: "Կիր", appointments: 2, patients: 1 },
                    ],
                    today: [
                        { month: "08:00", appointments: 2, patients: 1 },
                        { month: "10:00", appointments: 4, patients: 3 },
                        { month: "12:00", appointments: 6, patients: 5 },
                        { month: "14:00", appointments: 3, patients: 2 },
                        { month: "16:00", appointments: 5, patients: 4 },
                        { month: "18:00", appointments: 1, patients: 1 },
                    ],
                    allTime: [
                        { month: "2020", appointments: 45, patients: 30 },
                        { month: "2021", appointments: 78, patients: 55 },
                        { month: "2022", appointments: 120, patients: 89 },
                        { month: "2023", appointments: 165, patients: 110 },
                        { month: "2024", appointments: 200, patients: 143 },
                    ],
                }),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "notifications",
                value: JSON.stringify([
                    {
                        id: 1,
                        title: "Նոր գրանցում",
                        message: "Նոր պացիենտ է ավելացվել",
                        type: "patient",
                        date: new Date(),
                    },
                ]),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("homes", null, {});
    },
};
