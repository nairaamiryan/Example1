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
    async up(queryInterface) {
        const patients = [];
        let counter = 1000;
        const startDate = new Date("2024-05-01");

        for (let day = 0; day < 365; day++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + day);
            const count = 10 + Math.floor(Math.random() * 6); // 10-15 հիվանդ/օր

            for (let p = 0; p < count; p++) {
                patients.push({
                    name: NAMES[Math.floor(Math.random() * NAMES.length)],
                    surname: SURNAMES[Math.floor(Math.random() * SURNAMES.length)],
                    age: 18 + Math.floor(Math.random() * 65),
                    diagnosis: DIAGNOSES[Math.floor(Math.random() * DIAGNOSES.length)],
                    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
                    email: `patient${counter++}@example.com`,
                    createdAt: date,
                    updatedAt: date,
                });
            }
        }

        await queryInterface.bulkInsert("patients", patients);
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query(
            `DELETE FROM patients WHERE email LIKE 'patient1%' OR email LIKE 'patient2%' OR email LIKE 'patient3%' OR email LIKE 'patient4%'`
        );
    },
};
