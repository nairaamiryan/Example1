"use strict";

/** @type {import('sequelize-cli').Migration} */
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
        const patients = await queryInterface.sequelize.query(
            'SELECT id, name, surname FROM "patients"',
            { type: queryInterface.sequelize.QueryTypes.SELECT },
        );

        for (const patient of patients) {
            await queryInterface.sequelize.query(
                `UPDATE "patients" SET name_lower = :nameLower, surname_lower = :surnameLower WHERE id = :id`,
                {
                    replacements: {
                         nameLower: patient.name ? patient.name.toLowerCase() : "",
                         surnameLower: patient.surname ? patient.surname.toLowerCase() : "",
                        id: patient.id,
                    },
                },
            );
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("patients", "name_lower");
        await queryInterface.removeColumn("patients", "surname_lower");
    },
};
