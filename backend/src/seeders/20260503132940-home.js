"use strict";
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert("homes", [
            {
                key: "totalPatients",
                value: 120,
                label: "Ընդհանուր հիվանդներ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "totalDoctors",
                value: 25,
                label: "Ընդհանուր բժիշկներ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "totalReports",
                value: 48,
                label: "Ընդհանուր հաշվետվություններ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "totalNotes",
                value: 36,
                label: "Ընդհանուր նշումներ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "activePatients",
                value: 65,
                label: "Ակտիվ հիվանդներ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "stablePatients",
                value: 40,
                label: "Կայուն հիվանդներ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                key: "pendingPatients",
                value: 15,
                label: "Սպասող հիվանդներ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("homes", null, {});
    },
};
