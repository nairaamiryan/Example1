"use strict";
const NAMES = [
    "Արամ", "Լուսինե", "Գևորգ", "Սոնա", "Տիգրան",
    "Անուշ", "Հրանտ", "Նարինե", "Վարդան", "Մարիամ",
    "Հայկ", "Անի", "Դավիթ", "Մարինե", "Գայանե",
    "Վահե", "Արտակ", "Դիանա", "Անա", "Կարեն",
    "Նաիրա", "Ալեն", "Արման", "Սուսան", "Ռուզան",
    "Համալյա", "Նար", "Շուշան", "Թամարա", "Բաղրատ"
];
const SURNAMES = [
    "Սարգսյան", "Պետրոսյան", "Ավագյան", "Մելքոնյան", "Կարապետյան",
    "Դավթյան", "Ասատրյան", "Ղազարյան", "Հակոբյան", "Գրիգորյան",
    "Բաղդասարյան", "Հովհաննիսյան", "Մկրտչյան", "Վարդանյան", "Գաբրիելյան",
    "Հարությունյան", "Մարտիրոսյան", "Ստեփանյան", "Սիմոնյան", "Գալստյան",
    "Մուրադյան", "Մանուկյան", "Զաքարյան", "Աբրահամյան", "Գևորգյան"
];
const DIAGNOSES = [
    "Հիպերտոնիա", "Դիաբետ", "Միգրեն", "Արտրիտ", "Ինսուլտ",
    "Ասթմա", "Սրտի իշեմիա", "Թիրոիդ", "Բրոնխիտ", "Պնեւմոնիա",
    "Գաստրիտ", "Կոլիտ", "Անեմիա", "Արտրոզ", "Օստեոպորոզ",
    "Բարձր քոլեստերին", "Կարդիոմիոպաթիա", "Երիկամային անբավարարություն",
    "Դեպրեսիա", "Անհանգստություն", "Հիստերիա", "Շաքարային հիվանդություն",
    "Սրտի անբավարարություն", "Գլխացավ", "Քնի խանգարում"
];
const STATUSES = ["active", "stable", "pending"];

module.exports = {
    async up(queryInterface, Sequelize) {
        const doctors = await queryInterface.sequelize.query(
            `SELECT id, specialty FROM doctors;`,
            { type: Sequelize.QueryTypes.SELECT }
        );

        const specialtyMap = {
            "Հիպերտոնիա": "Կարդիոլոգ",
            "Դիաբետ": "Էնդոկրինոլոգ",
            "Միգրեն": "Նյարդաբան",
            "Արտրիտ": "Ուղղափայտաբույժ",
            "Ինսուլտ": "Նյարդաբան",
            "Ասթմա": "Թերապևտ",
            "Սրտի իշեմիա": "Կարդիոլոգ",
            "Թիրոիդ": "Էնդոկրինոլոգ",
            "Բրոնխիտ": "Թերապևտ",
            "Պնեւմոնիա": "Թերապևտ",
            "Գաստրիտ": "Թերապևտ",
            "Կոլիտ": "Թերապևտ",
            "Անեմիա": "Թերապևտ",
            "Արտրոզ": "Ուղղափայտաբույժ",
            "Օստեոպորոզ": "Ուղղափայտաբույժ",
            "Բարձր քոլեստերին": "Կարդիոլոգ",
            "Կարդիոմիոպաթիա": "Կարդիոլոգ",
            "Երիկամային անբավարարություն": "Ուրոլոգ",
            "Դեպրեսիա": "Նյարդաբան",
            "Անհանգստություն": "Նյարդաբան",
            "Հիստերիա": "Նյարդաբան",
            "Շաքարային հիվանդություն": "Էնդոկրինոլոգ",
            "Սրտի անբավարարություն": "Կարդիոլոգ",
            "Գլխացավ": "Նյարդաբան",
            "Քնի խանգարում": "Նյարդաբան"
        };

        const therapistId = doctors.find(d => d.specialty === "Թերապևտ")?.id || doctors[0].id;

        const getDoctorId = (diagnosis) => {
            const spec = specialtyMap[diagnosis];
            if (spec) {
                const doc = doctors.find(d => d.specialty === spec);
                if (doc) return doc.id;
            }
            return therapistId;
        };

        const patients = [];
        let counter = 1000;
        const startDate = new Date("2024-05-01");
        const endDate = new Date();
        const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

        for (let day = 0; day <= totalDays; day++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + day);
            const count = 10 + Math.floor(Math.random() * 6);

            for (let p = 0; p < count; p++) {
                const paddedId = String(counter).padStart(8, '0');
                const diagnosis = DIAGNOSES[Math.floor(Math.random() * DIAGNOSES.length)];
                patients.push({
                    id: `AA${paddedId}`,
                    name: NAMES[Math.floor(Math.random() * NAMES.length)],
                    surname: SURNAMES[Math.floor(Math.random() * SURNAMES.length)],
                    age: 18 + Math.floor(Math.random() * 65),
                    diagnosis: diagnosis,
                    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
                    email: `patient${counter}@example.com`,
                    doctorId: getDoctorId(diagnosis),
                    createdAt: date,
                    updatedAt: date,
                });
                counter++;
            }
        }
        await queryInterface.bulkInsert("patients", patients);
    },
    async down(queryInterface) {
        await queryInterface.sequelize.query(
            `DELETE FROM patients WHERE id::text LIKE 'AA%'`
        );
    },
};
