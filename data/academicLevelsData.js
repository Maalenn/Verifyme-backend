const AcademicLevels = require("../models/AcademicLevels");
const insertData = require("../utils/insertData");

const academiclevels = [
    {
        name: "Diploma",
    },
    {
        name: "Associate degrees",
    },
    {
        name: "Bachelor's degrees",
    },
    {
        name: "Master's degrees",
    },
    {
        name: "Doctoral's degrees",
    },
];

insertData(AcademicLevels, academiclevels, { validate: true, returning: false });
