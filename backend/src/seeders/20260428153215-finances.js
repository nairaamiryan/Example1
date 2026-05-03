"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("finances", [
            { title: "Բժշկական սարքավորումների գնում", description: "Նոր կարդիոգրաֆ սարքի ձեռքբերում", amount: 450000, type: "expense", date: "2024-06-01", createdAt: new Date(), updatedAt: new Date() },
            { title: "Ապահովագրական վճար", description: "Հիվանդների ապահովագրական ընկերությունից մուտք", amount: 320000, type: "income", date: "2024-05-15", createdAt: new Date(), updatedAt: new Date() },
            { title: "Դեղերի գնում", description: "Ամսական դեղապահակի համալրում", amount: 180000, type: "expense", date: "2024-05-01", createdAt: new Date(), updatedAt: new Date() },
            { title: "Հունվարի եկամուտ", description: "Հիվանդների վճարումներ հունվար ամսվա համար", amount: 2500000, type: "income", date: "2025-01-31", createdAt: new Date(), updatedAt: new Date() },
            { title: "Աշխատավարձ — Փետրվար", description: "Բժիշկների և անձնակազմի աշխատավարձ", amount: 1200000, type: "expense", date: "2025-02-28", createdAt: new Date(), updatedAt: new Date() },
            { title: "Փետրվարի եկամուտ", description: "Հիվանդների վճարումներ փետրվար ամսվա համար", amount: 2800000, type: "income", date: "2025-02-28", createdAt: new Date(), updatedAt: new Date() },
            { title: "Կոմունալ ծախսեր", description: "Էլեկտրականություն, ջուր, ջեռուցում", amount: 320000, type: "expense", date: "2025-03-31", createdAt: new Date(), updatedAt: new Date() },
            { title: "Մարտի եկամուտ", description: "Հիվանդների վճարումներ մարտ ամսվա համար", amount: 3100000, type: "income", date: "2025-03-31", createdAt: new Date(), updatedAt: new Date() },
            { title: "Ապրիլի եկամուտ", description: "Հիվանդների վճարումներ ապրիլ ամսվա համար", amount: 2950000, type: "income", date: "2025-04-30", createdAt: new Date(), updatedAt: new Date() },
            { title: "Դեղորայք գնում", description: "Ամսական դեղամիջոցների գնում", amount: 450000, type: "expense", date: "2025-04-30", createdAt: new Date(), updatedAt: new Date() },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("finances", null, {});
    },
};
