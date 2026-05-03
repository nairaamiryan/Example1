const db = require("../models/index");

const getStatistics = async (req, res) => {
    try {
        const [patients, doctors, reports, notes, finances, notifications] = await Promise.all([
            db.Patient.findAll(),
            db.Doctor.findAll(),
            db.Report.findAll(),
            db.Note.findAll(),
            db.Finance.findAll(),
            db.Notification.findAll({ order: [["date", "DESC"]], limit: 5 }),
        ]);

        const totalIncome = finances
            .filter(f => f.type === "income")
            .reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);

        const totalExpense = finances
            .filter(f => f.type === "expense")
            .reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);

        const byStatus = {
            active: patients.filter(p => p.status === "active").length,
            stable: patients.filter(p => p.status === "stable").length,
            pending: patients.filter(p => p.status === "pending").length,
        };

        const bySpecialty = doctors.reduce((acc, d) => {
            acc[d.specialty] = (acc[d.specialty] || 0) + 1;
            return acc;
        }, {});

        const topDoctors = [...doctors]
            .sort((a, b) => (b.patients || 0) - (a.patients || 0))
            .slice(0, 5)
            .map(d => ({ name: `${d.name} ${d.surname}`, patients: d.patients || 0 }));

        res.json({
            counts: {
                patients: patients.length,
                doctors: doctors.length,
                reports: reports.length,
                notes: notes.length,
                departments: Object.keys(bySpecialty).length,
            },
            byStatus,
            bySpecialty,
            topDoctors,
            finances: { totalIncome, totalExpense },
            recentNotifications: notifications,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getStatistics };
