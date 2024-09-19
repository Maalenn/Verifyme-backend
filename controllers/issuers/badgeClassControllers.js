const BadgeClasses = require("../../models/BadgeClasses");
const Issuers = require("../../models/Issuers");
const Institutions = require("../../models/Institutions");
const Criterias = require("../../models/Criterias");
const Achievements = require("../../models/Achievements");
const AchievementTypes = require("../../models/AchievementTypes");

const BaseControllers = require("../../utils/baseControllers");

// Include both Issuers and Institutions in the association
const associated = [
    {
        model: Issuers,
        include: [{ model: Institutions }],
    },
    {
        model: Achievements,
        include: [
            {
                model: AchievementTypes,
            },
        ],
    },
    {
        model: Criterias,
    },
];
const badgeClassControllers = new BaseControllers(BadgeClasses, ["name"], associated);

module.exports = badgeClassControllers;
