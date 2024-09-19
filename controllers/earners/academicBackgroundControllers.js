const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
const Institutions = require("../../models/Institutions");
const FieldOfStudies = require("../../models/FieldOfStudies");
const AcademicLevels = require("../../models/AcademicLevels");
const Users = require("../../models/Users");
const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");
const BaseControllers = require("../../utils/baseControllers");

const academicBackgroundsControllers = new BaseControllers(
    AcademicBackgrounds,
    [],
    [
        {
            model: Institutions,
            include: [Users],
        },
        FieldOfStudies,
        AcademicLevels,
        {
            model: Users,
            include: [Genders, Roles],
        },
    ],
);
module.exports = academicBackgroundsControllers;
