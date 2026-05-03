"use strict";
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert("notifications", [
            {
                title: "Հիվանդի հետազոտություն",
                message: "Արամ Սարգսյանի արյան թեստի արդյունքները պատրաստ են",
                type: "patient",
                date: new Date(),
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Ժամադրության հիշեցում",
                message: "Լուսինե Պետրոսյանի ժամադրությունը վաղը ժամը 10:00-ին է",
                type: "appointment",
                date: new Date(),
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Դեղատոմսի թարմացում",
                message: "Գայանե Հակոբյանի դեղատոմսի ժամկետը լրանում է 3 օրից",
                type: "prescription",
                date: new Date(),
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Նոր բժիշկ",
                message: "Համակարգում ավելացվել է նոր բժիշկ՝ Դավիթ Մկրտչյան",
                type: "doctor",
                date: new Date(),
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Համակարգի թարմացում",
                message: "Բժշկական կառավարման համակարգը թարմացվել է",
                type: "system",
                date: new Date(),
                read: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("notifications", null, {});
    },
};
