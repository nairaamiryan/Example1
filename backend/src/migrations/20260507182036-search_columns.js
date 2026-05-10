"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        const tableDesc = await queryInterface.describeTable("patients");

        if (!tableDesc.name_lower) {
            await queryInterface.addColumn("patients", "name_lower", {
                type: Sequelize.TEXT,
                allowNull: true,
            });
        }
        if (!tableDesc.surname_lower) {
            await queryInterface.addColumn("patients", "surname_lower", {
                type: Sequelize.TEXT,
                allowNull: true,
            });
        }

        await queryInterface.sequelize.query(`
            UPDATE "patients"
            SET name_lower = LOWER(COALESCE(name, '')),
                surname_lower = LOWER(COALESCE(surname, ''))
        `);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface
            .describeTable("patients")
            .then(async (tableDefinition) => {
                if (tableDefinition.name_lower) {
                    await queryInterface.removeColumn("patients", "name_lower");
                }
                if (tableDefinition.surname_lower) {
                    await queryInterface.removeColumn(
                        "patients",
                        "surname_lower",
                    );
                }
            });
    },
};
