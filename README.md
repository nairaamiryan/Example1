# 🏥 ԱռողջPlatform Բժշկական Կառավարման Համակարգ

Բժշկական կլինիկաների համար նախատեսված կառավարման համակարգ, որը հնարավորություն է տալիս կառավարել հիվանդներին, բժիշկներին, հաշվետվությունները, ֆինանսները և ծանուցումները։

---

## 🛠 Տեխնոլոգիաներ

### Backend
- **Node.js** — սերվերի միջավայր
- **Express.js** — վեբ ֆրեյմվորք
- **Sequelize ORM** — տվյալների բազայի կառավարում
- **PostgreSQL** — տվյալների բազա

### Frontend
- **React** — UI ֆրեյմվորք

---

## 📁 Նախագծի կառուցվածք

```
Example1/
├── backend/
│   └── src/
│       ├── migrations/     # Տվյալների բազայի migration-ներ
│       ├── models/         # Sequelize մոդելներ
│       ├── routes/         # API երթուղիներ
│       ├── seeders/        # Տվյալների բազայի seed ֆայլեր
│       └── config/         # Կոնֆիգուրացիա
└── frontend/
    ├── src/
    │   ├── components/     # React կոմպոնենտներ
    │   ├── routes/         # Էջերի երթուղիներ
    │   ├── services/       # API հարցումների սերվիսներ
    │   ├── App.js          # Գլխավոր կոմպոնենտ
    │   ├── App.css         # Ոճաշար
    │   ├── constants.js    # Հաստատուններ
    │   └── index.js        # Մուտքի կետ
    ├── index.html
    ├── webpack.config.js
    └── package.json
```

---

## ⚙️ Տեղադրում

### Նախապայմաններ
- Node.js (v14+)
- PostgreSQL
- npm կամ yarn

### 1. Կլոնավորում

```bash
git clone https://github.com/nairaamiryan/Example1.git
cd Example1
```

### 2. Backend-ի տեղադրում

```bash
cd backend/src
npm install
```

### 3. `.env` ֆայլի կարգավորում

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
```

### 4. Տվյալների բազայի migration-ներ

```bash
npx sequelize-cli db:migrate
```

### 5. Seed տվյալների ավելացում (ըստ ցանկության)

```bash
npx sequelize-cli db:seed:all
```

### 6. Սերվերի գործարկում

```bash
npm start
```

### 7. Frontend-ի տեղադրում և գործարկում

```bash
cd ../../frontend
npm install
npm start
```

---

## 🔧 Հիմնական գործառույթներ

- 👤 **Հիվանդներ** — ավելացնել, որոնել, կառավարել հիվանդների տվյալները
- 🩺 **Բժիշկներ** — բժիշկների գրանցում և կառավարում
- 📊 **Հաշվետվություններ** — բժշկական հաշվետվությունների կառավարում
- 📝 **Նշումներ** — հիվանդների նշումների վարում
- 💰 **Ֆինանսներ** — ֆինանսական հաշվառում
- 🔔 **Ծանուցումներ** — համակարգի ծանուցումներ

---

## 📜 Լիցենզիա

Այս նախագիծը մասնավոր է։ Բոլոր իրավունքները պաշտպանված են։
