"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `ALTER TABLE patients ALTER COLUMN id TYPE VARCHAR(255);`
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `ALTER TABLE patients ALTER COLUMN id TYPE INTEGER USING id::INTEGER;`
        );
    },
};
