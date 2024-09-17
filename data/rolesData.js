const Roles = require("../models/Roles");
const insertData = require("../utils/insertData");

const rolesData = [
    { name: "admin" },
    { name: "institutionOwner" },
    { name: "issuer" },
    { name: "earner" },
];

// Call the insert function with different models and data
insertData(Roles, rolesData, { validate: true, returning: true });
