const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../configs/database");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Users = sequelize.define(
    "Users",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Please tell us your first name!",
                },
                isAlpha: {
                    msg: "First name must contain only letters.",
                },
                len: {
                    args: [2, 30],
                    msg: "First name must be between 2 and 30 characters long.",
                },
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Please tell us your last name!",
                },
                isAlpha: {
                    msg: "Last name must contain only letters.",
                },
                len: {
                    args: [2, 30],
                    msg: "Last name must be between 2 and 30 characters long.",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Please provide a valid email",
                },
                notNull: {
                    msg: "Email is required!",
                },
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "User is required!",
                },
                notEmpty: {
                    msg: "User connot be empty",
                },
                len: {
                    args: [3, 30],
                    msg: "Username must be between 3 and 30 characters long.",
                },
                isAlphanumeric: {
                    msg: "Username can only contain letters and numbers.",
                },
                noSpaces(value) {
                    if (/\s/.test(value)) {
                        throw new Error("Username cannot contain spaces.");
                    }
                },
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Phone Number is required!",
                },
                isNumeric: {
                    msg: "Phone number must contain only numbers.",
                },
                len: {
                    args: [9, 30],
                    msg: "Phone number must be between 10 and 15 digits long.",
                },
            },
        },
        nationality: {
            type: DataTypes.STRING,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    msg: "Please provide a valide date of birth.",
                },
                isBefore: {
                    args: [new Date().toISOString().split("T")[0]],
                    msg: "Date of birth must be in the past.",
                },
            },
        },
        genderId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Genders",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            defaultValue: 1
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
        profileImage: {
            type: DataTypes.STRING,
        },
        bio: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 500],
                    msg: "Bio must be 500 characters or less.",
                },
            },
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordConfirm: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                validateMatchPassword(value) {
                    if (this.password !== value) {
                        throw new Error("Passwords do not match");
                    }
                },
            },
        },
        passwordChangedAt: DataTypes.DATE,
        passwordResetToken: DataTypes.STRING,
        passwordResetExpires: DataTypes.DATE,
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["email", "username", "phoneNumber"],
            },
        ],
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ["password", "passwordConfirm"] },
        },
        scopes: {
            withPassword: {
                attributes: { include: ["password"] },
            },
        },
    },
);

// Ensure password and passwordConfirm are not included in the response
Users.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    delete values.passwordConfirm;

    return values;
};

// Hash password
Users.beforeSave(async (user) => {
    // Only run this function if the password was actually modified
    if (!user.changed("password")) return;

    // Validate the length of the plain-text password
    if (user.password.length < 8 || user.password.length > 20) {
        throw Error("Password must be between 8 and 20 characters.");
    }

    user.password = await bcrypt.hash(user.password, 12);
});

// Adding a method to the user model prototype to check if a given password is correct
Users.prototype.correctPassword = async function (cadidatePassword, userPassword) {
    return await bcrypt.compare(cadidatePassword, userPassword);

    /*
        candidatePassword: the password entered by the user attempting to log in
        userPassword: the hased password stored in the database for this user
    */
};

// Update the passwordChangedAt field when the password is modified
Users.beforeSave(async (user) => {
    if (!user.changed("password") || user.isNewRecord) return;

    user.passwordChangedAt = new Date(Date.now() - 1000);
});

// Add a method to check if the user changed their password after a JWT token was issued
Users.prototype.changedPasswordAfter = function (JWTTimestamp) {
    // If passwordChangedAt exists, compare it to the JWT issuance timestamp
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // False means the password was not changed after the JWT was issued
    return false;
};

// Add a method to create a password reset token
Users.prototype.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10mn

    return resetToken;
};

module.exports = Users;
