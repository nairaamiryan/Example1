module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define(
        "Doctor",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            specialty: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            patients: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "doctors",
            timestamps: true,
        },
    );
    return Doctor;
};
