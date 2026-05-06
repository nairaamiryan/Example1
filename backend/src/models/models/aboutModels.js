module.exports = (sequelize, DataTypes) => {
    const About = sequelize.define(
        "About",
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            title: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: false },
            founded: { type: DataTypes.STRING, allowNull: false },
        },
        { tableName: "abouts", timestamps: true }
    );
    return About;
};
