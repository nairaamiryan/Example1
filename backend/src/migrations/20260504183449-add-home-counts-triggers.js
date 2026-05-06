"use strict";

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const client = new Client({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await client.connect();
        const sql = fs.readFileSync(
            path.join(__dirname, "sql/update_statistics.sql"),
            "utf8"
        );
        await client.query(sql);
        await client.query(`
            CREATE TRIGGER patients_after_insert
            AFTER INSERT ON patients
            FOR EACH STATEMENT
            EXECUTE FUNCTION update_statistics();
        `);
        await client.query(`
            CREATE TRIGGER patients_after_delete
            AFTER DELETE ON patients
            FOR EACH STATEMENT
            EXECUTE FUNCTION update_statistics();
        `);
        await client.query(`
            CREATE TRIGGER doctors_after_insert
            AFTER INSERT ON doctors
            FOR EACH STATEMENT
            EXECUTE FUNCTION update_statistics();

        `);
        await client.query(`
            CREATE TRIGGER doctors_after_delete
            AFTER DELETE ON doctors
            FOR EACH STATEMENT
            EXECUTE FUNCTION update_statistics();
        `);
        await client.query(`
            CREATE TRIGGER notifications_after_insert
            AFTER INSERT ON notifications
            FOR EACH ROW
            EXECUTE FUNCTION update_statistics();
        `);
        await client.query(`
            CREATE TRIGGER notifications_after_delete
            AFTER DELETE ON notifications
            FOR EACH ROW
            EXECUTE FUNCTION update_statistics();
        `);
        await client.end();
    },

    async down(queryInterface, Sequelize) {
        const client = new Client({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await client.connect();
        await client.query(
            `DROP TRIGGER IF EXISTS patients_after_insert ON patients;`,
        );
        await client.query(
            `DROP TRIGGER IF EXISTS patients_after_delete ON patients;`,
        );
        await client.query(
            `DROP TRIGGER IF EXISTS doctors_after_insert ON doctors;`,
        );
        await client.query(
            `DROP TRIGGER IF EXISTS doctors_after_delete ON doctors;`,
        );
        await client.query(
            `DROP TRIGGER IF EXISTS notifications_after_insert ON notifications;`,
        );
        await client.query(
            `DROP TRIGGER IF EXISTS notifications_after_delete ON notifications;`,
        );
        await client.query(
            `DROP FUNCTION IF EXISTS update_statistics;`,
        );
        await client.end();
    },
};
