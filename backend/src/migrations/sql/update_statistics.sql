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