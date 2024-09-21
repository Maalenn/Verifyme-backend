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
    inviterCode: {
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
    inviteExpires: {
        type: DataTypes.DATE,
        defaultValue: () => {
            // Calculate 30 days from now
            const currentDate = new Date();
            return new Date(currentDate.setDate(currentDate.getDate() + 30)); // 30 days
            // return new Date(currentDate.getTime() + 5 * 60 * 1000); // 5mn 
        },
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = InviteUsers;
