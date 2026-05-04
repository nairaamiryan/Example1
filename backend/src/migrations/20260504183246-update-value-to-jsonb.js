"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            ALTER TABLE homes
            ALTER COLUMN value TYPE JSONB
            USING COALESCE(value, '{}'::json)::jsonb;
        `);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            ALTER TABLE homes
            ALTER COLUMN value TYPE JSON
            USING value::JSON;
        `);
    },
};
