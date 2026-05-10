"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
         await queryInterface.sequelize.query(`
            ALTER TABLE homes
            ALTER COLUMN value SET DEFAULT '{}'::jsonb;
        `);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            ALTER TABLE homes
            ALTER COLUMN value DROP DEFAULT;
        `);
    },
};
