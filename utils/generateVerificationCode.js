const crypto = require("crypto");

exports.generateVerificationCode = () => {
    return crypto.randomInt(100000, 1000000).toString();
};
