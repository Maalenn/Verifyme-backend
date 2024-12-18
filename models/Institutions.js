const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Institutions = sequelize.define(
    "Institutions",
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
        institutionName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Institution name cannot be empty.",
                },
            },
        },
        institutionBio: {
            type: DataTypes.STRING,
        },
        institutionEmail: {
            type: DataTypes.STRING,
            unique: {
                msg: "This email is already in use.",
            },
            validate: {
                isEmail: {
                    msg: "Please provide a valid email address.",
                },
                notEmpty: {
                    msg: "Email cannot be empty.",
                },
            },
        },
        institutionPhoneNumber: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Phone number cannot be empty.",
                },
                isNumeric: {
                    msg: "Phone number must contain only numbers.",
                },
                len: {
                    args: [8, 30],
                    msg: "Phone number must be between 8 and 30 digits long.",
                },
            },
        },
        institutionWebsiteUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        institutionProfileImage: {
            type: DataTypes.STRING,
        },
        stripeCustomerId: {
            type: DataTypes.STRING,
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
                fields: ["institutionName", "stripeCustomerId", "code"],
            },
        ],
    },
);

module.exports = Institutions;
