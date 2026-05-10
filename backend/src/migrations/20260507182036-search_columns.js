"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("patients", "name_lower", {
            type: Sequelize.TEXT,
            allowNull: true,
        });
        await queryInterface.addColumn("patients", "surname_lower", {
            type: Sequelize.TEXT,
            allowNull: true,
        });
        await queryInterface.sequelize.query(`
            UPDATE "patients"
            SET name_lower = LOWER(COALESCE(name, '')),
                surname_lower = LOWER(COALESCE(surname, ''))
        `);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("patients", "name_lower");
        await queryInterface.removeColumn("patients", "surname_lower");
    },
};
