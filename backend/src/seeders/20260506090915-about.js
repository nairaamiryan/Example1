"use strict";
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert("abouts", [
            {
                title: "Մեր մասին",
                description: "Մեր կլինիկան հիմնադրվել է 2005 թվականին և հանդիսանում է տարածաշրջանի առաջատար բժշկական հաստատություններից մեկը։ Մենք առաջարկում ենք բարձրակարգ բժշկական ծառայություններ՝ ապահովելով հիվանդների ամբողջական խնամք և բուժում։",
                founded: "2005",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete("abouts", null, {});
    },
};
