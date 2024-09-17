const Genders = require("../models/Genders");
const insertData = require("../utils/insertData");

const gendersData = [
    { name: "male" }, 
    { name: "female" }
];

// Call the insert function with different models and data
insertData(Genders, gendersData, { validate: true, returning: false });
