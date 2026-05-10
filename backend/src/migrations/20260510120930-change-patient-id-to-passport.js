"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`ALTER TABLE patients DROP CONSTRAINT patients_pkey CASCADE;`);
        await queryInterface.sequelize.query(`ALTER TABLE patients DROP COLUMN id;`);
        await queryInterface.sequelize.query(`ALTER TABLE patients ADD COLUMN id VARCHAR(255) PRIMARY KEY;`);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`ALTER TABLE patients DROP CONSTRAINT patients_pkey CASCADE;`);
        await queryInterface.sequelize.query(`ALTER TABLE patients DROP COLUMN id;`);
        await queryInterface.sequelize.query(`ALTER TABLE patients ADD COLUMN id SERIAL PRIMARY KEY;`);
    },
};
