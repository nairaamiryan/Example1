"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            ALTER TABLE patients ADD COLUMN IF NOT EXISTS name_lower TEXT;
        `);
        await queryInterface.sequelize.query(`
            ALTER TABLE patients ADD COLUMN IF NOT EXISTS surname_lower TEXT;
        `);
        await queryInterface.sequelize.query(`
            UPDATE "patients"
            SET name_lower = LOWER(COALESCE(name, '')),
                surname_lower = LOWER(COALESCE(surname, ''))
        `);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            ALTER TABLE patients DROP COLUMN IF EXISTS name_lower;
        `);
        await queryInterface.sequelize.query(`
            ALTER TABLE patients DROP COLUMN IF EXISTS surname_lower;
        `);
    },
};
