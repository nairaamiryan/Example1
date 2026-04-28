"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("notes", [
            {
                title: "Արամ Սարգսյանի նշում",
                description: "Հիվանդը բողոքում է գլխացավից և ճնշման բարձրացումից",
                type: "diagnosis",
                date: "2024-06-01",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Լուսինե Պետրոսյանի նշում",
                description: "Շաքարի մակարդակը նորմայի սահմաններում է, դեղաբուժությունը շարունակել",
                type: "prescription",
                date: "2024-05-15",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Գևորգ Ավագյանի անալիզ",
                description: "Արյան ընդհանուր անալիզ, բիոքիմիա, հորմոններ",
                type: "labtest",
                date: "2024-05-01",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("notes", null, {});
    },
};
