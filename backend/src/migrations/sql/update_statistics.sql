CREATE OR REPLACE FUNCTION update_statistics()
RETURNS TRIGGER AS $$
BEGIN
    -- counts
    UPDATE homes
    SET value = jsonb_build_object(
        'patients', (SELECT COUNT(*) FROM patients),
        'doctors', (SELECT COUNT(*) FROM doctors),
        'reports', (SELECT COUNT(*) FROM reports),
        'notes', (SELECT COUNT(*) FROM notes),
        'departments', (SELECT COUNT(DISTINCT specialty) FROM doctors)
    )
    WHERE key = 'counts';

    -- byStatus
    UPDATE homes
    SET value = jsonb_build_object(
        'active',  (SELECT COUNT(*) FROM patients WHERE status = 'active'),
        'stable',  (SELECT COUNT(*) FROM patients WHERE status = 'stable'),
        'pending', (SELECT COUNT(*) FROM patients WHERE status = 'pending')
    )
    WHERE key = 'byStatus';

    -- bySpecialty
    UPDATE homes
    SET value = COALESCE(
        (
            SELECT jsonb_object_agg(specialty, cnt)
            FROM (
                SELECT specialty, COUNT(*) AS cnt
                FROM doctors
                GROUP BY specialty
            ) s
        ),
        '{}'::jsonb
    )
    WHERE key = 'bySpecialty';

    -- topDoctors
    UPDATE homes
    SET value = COALESCE(
        (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'name', name || ' ' || surname,
                    'patients', patients
                )
            )
            FROM (
                SELECT name, surname, patients
                FROM doctors
                ORDER BY patients DESC
                LIMIT 5
            ) d
        ),
        '[]'::jsonb
    )
    WHERE key = 'topDoctors';

    -- finances
    UPDATE homes
    SET value = jsonb_build_object(
        'totalIncome',  COALESCE((SELECT SUM(amount) FROM finances WHERE type = 'income'), 0),
        'totalExpense', COALESCE((SELECT SUM(amount) FROM finances WHERE type = 'expense'), 0)
    )
    WHERE key = 'finances';

    -- timeline
    UPDATE homes
    SET value = jsonb_build_object(
        'monthly', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'month', to_char(month_date, 'Mon'),
                    'patients', patient_count
                ) ORDER BY month_date
            )
            FROM (
                SELECT date_trunc('month', "createdAt") AS month_date,
                       COUNT(*) AS patient_count
                FROM patients
                WHERE "createdAt" >= NOW() - INTERVAL '12 months'
                GROUP BY date_trunc('month', "createdAt")
            ) m
        ),
        'weekly', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'month', to_char(day_date, 'Dy'),
                    'patients', patient_count
                ) ORDER BY day_date
            )
            FROM (
                SELECT date_trunc('day', "createdAt") AS day_date,
                       COUNT(*) AS patient_count
                FROM patients
                WHERE "createdAt" >= NOW() - INTERVAL '7 days'
                GROUP BY date_trunc('day', "createdAt")
            ) w
        ),
        'today', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'month', to_char(hour_date, 'HH24:00'),
                    'patients', patient_count
                ) ORDER BY hour_date
            )
            FROM (
                SELECT date_trunc('hour', "createdAt") AS hour_date,
                       COUNT(*) AS patient_count
                FROM patients
                WHERE "createdAt"::date = CURRENT_DATE
                GROUP BY date_trunc('hour', "createdAt")
            ) t
        ),
        'allTime', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'month', to_char(year_date, 'YYYY'),
                    'patients', patient_count
                ) ORDER BY year_date
            )
            FROM (
                SELECT date_trunc('year', "createdAt") AS year_date,
                       COUNT(*) AS patient_count
                FROM patients
                GROUP BY date_trunc('year', "createdAt")
            ) a
        )
    )
    WHERE key = 'timeline';

    -- notifications
    UPDATE homes
    SET value = COALESCE(
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
                SELECT * FROM notifications
                ORDER BY date DESC
                LIMIT 5
            ) n
        ),
        '[]'::jsonb
    )
    WHERE key = 'notifications';

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
