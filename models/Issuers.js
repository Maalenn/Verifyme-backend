const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");

const Issuers = sequelize.define(
    "Issuers",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        institutionId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Institutions",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        code: {
            type: DataTypes.STRING(6),
            allowNull: true,
            validate: {
                isNumeric: {
                    msg: "Verification code must contain only numbers.",
                },
                len: {
                    args: [6, 6],
                    msg: "Verification code must be exactly 6 digits.",
                },
            },
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["code"],
            },
        ],
    },
);

module.exports = Issuers;
