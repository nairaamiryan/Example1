"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    useTransaction: false,
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
          CREATE OR REPLACE FUNCTION update_statistics()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE homes
                SET value =
                COALESCE(value::jsonb, '{}'::jsonb)
                ||
                jsonb_build_object(
                    'patients', (SELECT COUNT(*) FROM patients),
                    'doctors', (SELECT COUNT(*) FROM doctors),
                    'notifications',
                    COALESCE(
                        (
                            SELECT jsonb_agg(
                                jsonb_build_object(
                                    'id', id,
                                    'title', title,
                                    'message', message,
                                    'type', type,
                                    'date', date
                                )
                            )
                            FROM (
                                SELECT *
                                FROM notifications
                                ORDER BY date DESC
                                LIMIT 3
                            ) n
                        ),
                        '[]'::jsonb
                    )
                )
                WHERE key = 'counts';
                UPDATE homes
            SET value =
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'id', id,
                            'title', title,
                            'message', message,
                            'type', type,
                            'date', date
                        )
                    )
                    FROM (
                        SELECT *
                        FROM notifications
                        ORDER BY date DESC
                        LIMIT 3
                    ) n
                ),
                '[]'::jsonb
            )
            WHERE key = 'notifications';
                RETURN NULL;
            END;
          $$ LANGUAGE plpgsql;
        `);
        await queryInterface.sequelize.query(`
            CREATE TRIGGER patients_after_insert
            AFTER INSERT ON patients
            FOR EACH STATEMENT
            EXECUTE FUNCTION update_statistics();
        `);
        await queryInterface.sequelize.query(`
            CREATE TRIGGER patients_after_delete
            AFTER DELETE ON patients
            FOR EACH STATEMENT
            EXECUTE FUNCTION update_statistics();
        `);
        await queryInterface.sequelize.query(`
            CREATE TRIGGER doctors_after_insert
            AFTER INSERT ON doctors
            FOR EACH STATEMENT
            EXECUTE FUNCTION update_statistics();

        `);

        await queryInterface.sequelize.query(`
            CREATE TRIGGER doctors_after_delete
            AFTER DELETE ON doctors
            FOR EACH STATEMENT
            EXECUTE FUNCTION update_statistics();
        `);
        await queryInterface.sequelize.query(`
            CREATE TRIGGER notifications_after_insert
            AFTER INSERT ON notifications
            FOR EACH ROW
            EXECUTE FUNCTION update_statistics();
        `);

        await queryInterface.sequelize.query(`
            CREATE TRIGGER notifications_after_delete
            AFTER DELETE ON notifications
            FOR EACH ROW
            EXECUTE FUNCTION update_statistics();
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
            `DROP FUNCTION IF EXISTS update_statistics;`,
        );
    },
};
