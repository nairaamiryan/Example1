export default (sequelize, DataTypes) => {
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
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
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
