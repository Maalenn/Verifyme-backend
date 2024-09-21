const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");

const Issuers = sequelize.define("Issuers", {
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
        onUpdate: "CASCADE"
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
});

module.exports = Issuers;
