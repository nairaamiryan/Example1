module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
        "Notification",
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            title: { type: DataTypes.STRING, allowNull: false },
            message: { type: DataTypes.TEXT, allowNull: false },
            type: {
                type: DataTypes.ENUM("patient", "doctor", "appointment", "prescription", "system"),
                allowNull: false,
                defaultValue: "system",
            },
            date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            read: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        { tableName: "notifications", timestamps: true }
    );
    return Notification;
};
