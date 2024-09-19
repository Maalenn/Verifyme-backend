const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const ServicePlans = sequelize.define(
    "ServicePlans",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Service plan name cannot be empty.",
                },
                len: {
                    args: [3, 100],
                    msg: "Service plan name must be between 3 and 100 characters long.",
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 500],
                    msg: "Description can be up to 500 characters long.",
                },
            },
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Duration must be an integer value.",
                },
                min: {
                    args: 1,
                    msg: "Duration must be at least 1 month.",
                },
                max: {
                    args: 60,
                    msg: "Duration cannot exceed 60 months.",
                },
            },
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: {
                    msg: "Price must be a valid decimal number.",
                },
                min: {
                    args: 0,
                    msg: "Price cannot be negative.",
                },
            },
        },
        badgeLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Badge limit must be an integer value.",
                },
                min: {
                    args: 0,
                    msg: "Badge limit cannot be negative.",
                },
            },
        },
        peopleLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "People limit must be an integer value.",
                },
                min: {
                    args: 0,
                    msg: "People limit cannot be negative.",
                },
            },
        },
        isBadgeVerificationAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isBadgeBackpackFree: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isBadgeReportsAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isBadgeCertificatesAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isTechnicalSupportType: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        stripeProductId : {
            type : DataTypes.STRING,
            allowNull: false
        },
        stripePriceId : {
            type : DataTypes.STRING,
            allowNull: false
        },

    },
    {
        indexes: [
            {
                unique: true,
                fields: ["name", "stripeProductId", "stripePriceId"],
            },
        ],
    },
);

module.exports = ServicePlans;
