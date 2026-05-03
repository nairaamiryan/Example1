module.exports = (sequelize, DataTypes) => {
    const Home = sequelize.define(
        "Home",
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            key: { type: DataTypes.STRING, allowNull: false, unique: true },
            value: { type: DataTypes.JSON, allowNull: false },
            label: { type: DataTypes.STRING, allowNull: true },
        },
        { tableName: "homes", timestamps: true }
    );
    return Home;
};
