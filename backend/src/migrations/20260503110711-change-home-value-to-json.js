"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            ALTER TABLE "homes"
            ALTER COLUMN "value" DROP DEFAULT;
        `);

        await queryInterface.sequelize.query(`
            ALTER TABLE "homes"
            ALTER COLUMN "value"
            TYPE JSONB
            USING to_jsonb(value);
        `);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            ALTER TABLE "homes"
            ALTER COLUMN "value"
            TYPE INTEGER
            USING (value::integer);
        `);
    },
};
