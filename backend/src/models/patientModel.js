module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define(
        "Patient",
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            name: { type: DataTypes.STRING, allowNull: false },
            surname: { type: DataTypes.STRING, allowNull: false },
            age: { type: DataTypes.INTEGER, allowNull: false },
            diagnosis: { type: DataTypes.STRING, allowNull: false },
            status: { type: DataTypes.ENUM("active", "stable", "pending"), allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
        },
        { tableName: "patients", timestamps: true }
    );
    return Patient;
};
