const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Images = sequelize.define(
    "Images",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: DataTypes.STRING,
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }
);

module.exports = Images;
