module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define("Report", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        pinned: { type: DataTypes.BOOLEAN, defaultValue: false },
        archived: { type: DataTypes.BOOLEAN, defaultValue: false },
        locked: { type: DataTypes.BOOLEAN, defaultValue: false },
        read: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, { tableName: "reports", timestamps: true });
    return Report;
};
