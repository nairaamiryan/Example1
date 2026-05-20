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
            doctorId: { type: DataTypes.INTEGER, allowNull: true },
        },
        { tableName: "patients", timestamps: true }
    );

    Patient.associate = (models) => {
        Patient.belongsTo(models.Doctor, { 
            foreignKey: "doctorId", 
            as: "doctor",
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        });
    };

    return Patient;
};
