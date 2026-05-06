"use strict";

const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const sql = fs.readFileSync(
            path.join(__dirname, "sql/update_statistics.sql"),
            "utf8",
        );
        await queryInterface.sequelize.query(sql);
        await queryInterface.sequelize.query(`
            CREATE TRIGGER patients_after_insert
            AFTER INSERT ON patients
            FOR EACH STATEMENT
            EXECUTE PROCEDURE update_statistics();
        `);
        await queryInterface.sequelize.query(`
            CREATE TRIGGER patients_after_delete
            AFTER DELETE ON patients
            FOR EACH STATEMENT
            EXECUTE PROCEDURE update_statistics();
        `);
        await queryInterface.sequelize.query(`
            CREATE TRIGGER doctors_after_insert
            AFTER INSERT ON doctors
            FOR EACH STATEMENT
            EXECUTE PROCEDURE update_statistics();

        `);

        await queryInterface.sequelize.query(`
            CREATE TRIGGER doctors_after_delete
            AFTER DELETE ON doctors
            FOR EACH STATEMENT
            EXECUTE PROCEDURE update_statistics();
        `);
        await queryInterface.sequelize.query(`
            CREATE TRIGGER notifications_after_insert
            AFTER INSERT ON notifications
            FOR EACH ROW
            EXECUTE PROCEDURE update_statistics();
        `);

        await queryInterface.sequelize.query(`
            CREATE TRIGGER notifications_after_delete
            AFTER DELETE ON notifications
            FOR EACH ROW
            EXECUTE PROCEDURE update_statistics();
        `);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `DROP TRIGGER IF EXISTS patients_after_insert ON patients;`,
        );
        await queryInterface.sequelize.query(
            `DROP TRIGGER IF EXISTS patients_after_delete ON patients;`,
        );
        await queryInterface.sequelize.query(
            `DROP TRIGGER IF EXISTS doctors_after_insert ON doctors;`,
        );
        await queryInterface.sequelize.query(
            `DROP TRIGGER IF EXISTS doctors_after_delete ON doctors;`,
        );
        await queryInterface.sequelize.query(
            `DROP TRIGGER IF EXISTS notifications_after_insert ON notifications;`,
        );
        await queryInterface.sequelize.query(
            `DROP TRIGGER IF EXISTS notifications_after_delete ON notifications;`,
        );
        await queryInterface.sequelize.query(
            `DROP FUNCTION IF EXISTS update_statistics();`,
        );
    },
};
