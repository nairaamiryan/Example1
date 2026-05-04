"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            UPDATE homes
            SET value = value
            WHERE key = 'counts';
        `);
    },

    async down(queryInterface, Sequelize) {},
};
