const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const BadgeClasses = sequelize.define(
    "BadgeClasses",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Name cannot be empty",
                },
                len: {
                    args: [3, 150],
                    msg: "Name must be between 3 and 150 characters long",
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "Description cannot exceed 255 characters",
                },
            },
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        issuerId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Issuers",
                key: "id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        },
        alignmentId: {
            type: DataTypes.INTEGER,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "Tags cannot exceed 255 characters",
                },
            },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = BadgeClasses;