const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Genders = sequelize.define(
    "Genders",
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Gender cannot be empty",
                },
                isIn: {
                    args: [["male", "female"]],
                    msg: "Gender must be male or female",
                },
            },
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["name"],
            },
        ],
        timestamps: false,
    },
);

module.exports = Genders;
