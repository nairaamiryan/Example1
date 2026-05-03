"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("reports", [
            { title: "Հիպերտոնիա հետազոտության արդյունքներ", description: "2024 թվականի առաջին կիսամակի հիպերտոնիա հիվանդների հետազոտության ամփոփ արդյունքները", date: "2024-06-01", createdAt: new Date(), updatedAt: new Date() },
            { title: "Դիաբետի կանխարգելման ծրագիր", description: "Հիվանդանոցի դիաբետի կանխարգելման ծրագրի ամսական հաշվետվություն և վիճակագրություն", date: "2024-05-15", createdAt: new Date(), updatedAt: new Date() },
            { title: "Կարդիոլոգիական բաժանմունքի ամփոփում", description: "Կարդիոլոգիական բաժանմունքի եռամսյակային հաշվետվություն՝ հիվանդների թիվը, բուժման արդյունքները", date: "2024-04-30", createdAt: new Date(), updatedAt: new Date() },
            { title: "Ամսական հաշվետվություն — Հունվար", description: "Հունվար ամսվա կլինիկայի ամփոփ հաշվետվությունը։ Ընդհանուր 120 հիվանդ է սպասարկվել։", date: "2025-01-31", createdAt: new Date(), updatedAt: new Date() },
            { title: "Վիրաբուժական բաժնի հաշվետվություն", description: "Վիրաբուժական բաժնում կատարված 15 վիրահատությունների ամփոփ հաշվետվություն։", date: "2025-03-15", createdAt: new Date(), updatedAt: new Date() },
            { title: "Եռամսյա ֆինանսական հաշվետվություն", description: "2025 թ. առաջին եռամսյակի ֆինանսական արդյունքները։", date: "2025-03-31", createdAt: new Date(), updatedAt: new Date() },
            { title: "Մանկաբուժության բաժնի հաշվետվություն", description: "Ապրիլ ամսվա մանկաբուժության բաժնի հաշվետվություն։ 53 երեխա է սպասարկվել։", date: "2025-04-30", createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("reports", null, {});
    },
};
