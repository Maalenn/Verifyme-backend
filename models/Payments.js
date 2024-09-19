const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Payments = sequelize.define("Payments", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Subscriptions",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        validate: {
            notNull: {
                msg: "Subscription ID is required.",
            },
            isInt: {
                msg: "Subscription ID must be an integer.",
            },
        },
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Amount is required.",
            },
            isDecimal: "Amount must be a decimal value.",
            min: {
                args: [0],
                msg: "Amount must be greater than or equal to 0.",
            },
        },
    },
    paymentMethod: {
        type: DataTypes.STRING,
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: "Payment date must be a valid date.",
            },
            isBeforeCurrentdate(value) {
                if (new Date(value) > new Date()) {
                    throw new Error("Payment date cannot be in the future.");
                }
            },
        },
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue : false
    },
});

module.exports = Payments;
