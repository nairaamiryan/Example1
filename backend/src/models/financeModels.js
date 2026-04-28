export default (sequelize, DataTypes) => {
    const Finance = sequelize.define(
        "Finance",
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
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            type: {
                type: DataTypes.ENUM("income", "expense"),
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            tableName: "finances",
            timestamps: true,
        },
    );

    return Finance;
};
