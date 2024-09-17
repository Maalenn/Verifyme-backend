const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Addresses = sequelize.define(
    "Addresses",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            // allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            // allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Street is required.",
                },
            },
        },
        city: {
            type: DataTypes.STRING,
            // allowNull: false,
            validate: {
                notEmpty: {
                    msg: "City is required.",
                },
            },
        },
        postalCode: {
            type: DataTypes.STRING,
            // allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Postal Code is required.",
                },
                isNumeric: {
                    msg: "Postal Code must be numeric.",
                },
            },
        },
        country: {
            type: DataTypes.STRING,
            // allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Country is required.",
                },
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        institutionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Institutions",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Addresses;
