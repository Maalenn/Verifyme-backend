const Courses = require("../../models/Courses");
const Specializations = require("../../models/Specializations");
const FieldOfStudies = require("../../models/FieldOfStudies");

const BaseControllers = require("../../utils/baseControllers");

const courseControllers = new BaseControllers(
    Courses,
    ["name"],
    [
        {
            model: Specializations,
            include: [FieldOfStudies],
        },
        FieldOfStudies,
    ],
);
module.exports = courseControllers;
