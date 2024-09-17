const Criterias = require("../models/Criterias");
const insertData = require("../utils/insertData");

const criteriasData = [
    {
        id: 1,
        narrative: "Complete 10 hours of community service.",
        badgeClassId: 1,
    },
    {
        id: 2,
        narrative: "Participate in 5 group projects.",
        badgeClassId: 2,
    },
    {
        id: 3,
        narrative: "Submit 3 research papers.",
        badgeClassId: 3,
    },
    {
        id: 4,
        narrative: "Attend 8 workshops.",
        badgeClassId: 4,
    },
    {
        id: 6,
        narrative: "Lead a team in a project.",
        badgeClassId: 6,
    },
    {
        id: 7,
        narrative: "Create a tutorial for a new software.",
        badgeClassId: 7,
    },
    {
        id: 8,
        narrative: "Participate in a hackathon.",
        badgeClassId: 8,
    },
    {
        id: 9,
        narrative: "Complete an online certification course.",
        badgeClassId: 9,
    },
    {
        id: 10,
        narrative: "Mentor a junior member.",
        badgeClassId: 10,
    },
];

insertData(Criterias, criteriasData, { validate: true, returning: false });
