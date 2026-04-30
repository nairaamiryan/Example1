module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define(
        "Note",
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
            type: {
                type: DataTypes.ENUM("diagnosis", "prescription", "labtest", "document"),
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            tableName: "notes",
            timestamps: true,
        },
    );
    return Note;
};
