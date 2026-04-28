export default (sequelize, DataTypes) => {
    const Report = sequelize.define(
        "Report",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            tableName: "reports",
            timestamps: true,
        },
    );

    return Report;
};
