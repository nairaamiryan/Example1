"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("reports", [
            {
                title: "Հիպերտոնիա հետազոտության արդյունքներ",
                description: "2024 թվականի առաջին կիսամակի հիպերտոնիա հիվանդների հետազոտության ամփոփ արդյունքները",
                date: "2024-06-01",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Դիաբետի կանխարգելման ծրագիր",
                description: "Հիվանդանոցի դիաբետի կանխարգելման ծրագրի ամսական հաշվետվություն և վիճակագրություն",
                date: "2024-05-15",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "Կարդիոլոգիական բաժանմունքի ամփոփում",
                description: "Կարդիոլոգիական բաժանմունքի եռամսյակային հաշվետվություն՝ հիվանդների թիվը, բուժման արդյունքները",
                date: "2024-04-30",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("reports", null, {});
    },
};
