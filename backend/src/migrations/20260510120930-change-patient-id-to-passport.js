"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `ALTER TABLE patients DROP CONSTRAINT IF EXISTS patients_pkey;`
        );
        await queryInterface.sequelize.query(
            `ALTER TABLE patients ALTER COLUMN id TYPE VARCHAR(255);`
        );
        await queryInterface.sequelize.query(
            `ALTER TABLE patients ADD PRIMARY KEY (id);`
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `ALTER TABLE patients DROP CONSTRAINT IF EXISTS patients_pkey;`
        );
        await queryInterface.sequelize.query(
            `ALTER TABLE patients ALTER COLUMN id TYPE INTEGER 
             USING translate(id, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '')::INTEGER;`
        );
        await queryInterface.sequelize.query(
            `ALTER TABLE patients ADD PRIMARY KEY (id);`
        );
    },
};