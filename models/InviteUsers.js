const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const InviteUsers = sequelize.define("InviteUsers", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Roles",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    inviteEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Please provide a valid email.",
            },
        },
    },
    institutionCode: {
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
});
