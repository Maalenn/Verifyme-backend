const Achievements = require("../models/Achievements");
const insertData = require("../utils/insertData");

const achievementsData = [
    {
        id: 1,
        badgeClassId: 1,
        achievementTypeId: 1,
        status: "ToDo",
    },
    {
        id: 2,
        badgeClassId: 2,
        achievementTypeId: 2,
        status: "Doing",
    },
    {
        id: 3,
        badgeClassId: 3,
        achievementTypeId: 3,
        status: "Done",
    },
    {
        id: 4,
        badgeClassId: 4,
        achievementTypeId: 4,
        status: "ToDo",
    },
    {
        id: 6,
        badgeClassId: 6,
        achievementTypeId: 6,
        status: "Done",
    },
    {
        id: 7,
        badgeClassId: 7,
        achievementTypeId: 7,
        status: "ToDo",
    },
    {
        id: 8,
        badgeClassId: 8,
        achievementTypeId: 8,
        status: "Doing",
    },
    {
        id: 9,
        badgeClassId: 9,
        achievementTypeId: 9,
        status: "Done",
    },
    {
        id: 10,
        badgeClassId: 10,
        achievementTypeId: 10,
        status: "ToDo",
    },
];

insertData(Achievements, achievementsData, { validate: true, returning: false });
