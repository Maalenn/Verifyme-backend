const Earners = require("../../models/Earners");
const Users = require("../../models/Users");
const Achievements = require("../../models/Achievements");
const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
const BadgeClasses = require("../../models/BadgeClasses");
const Roles = require("../../models/Roles");
const Genders = require("../../models/Genders");
const BaseControllers = require("../../utils/baseControllers");
const AcademicLevels = require("../../models/AcademicLevels");
const Institutions = require("../../models/Institutions");
const AchievementTypes = require("../../models/AchievementTypes");
const earnerControllers = new BaseControllers(
    Earners,
    [],
    [
        {
            model: Users,
            include: [Roles, Genders],
        },
        {
            model: AcademicBackgrounds,
            include: [AcademicLevels, Institutions],
        },
        {
            model: Achievements,
            include: [BadgeClasses, AchievementTypes],
        },
    ],
);
module.exports = earnerControllers;
