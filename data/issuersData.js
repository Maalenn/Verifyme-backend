const Issuers = require("../models/Issuers");
const insertData = require("../utils/insertData");

const issuersData = [
    {
        id: 1,
        userId: 4,
        institutionId: 7,
        endorsementId: 501,
    },
    {
        id: 2,
        userId: 5,
        institutionId: 9,
        endorsementId: 502,
    },
    {
        id: 3,
        userId: 9,
        institutionId: 10,
        endorsementId: 503,
    },
    {
        id: 4,
        userId: 13,
        institutionId: 11,
        endorsementId: 504,
    },
    {
        id: 6,
        userId: 17,
        institutionId: 13,
        endorsementId: 506,
    },
    {
        id: 7,
        userId: 18,
        institutionId: 16,
        endorsementId: 507,
    },
    {
        id: 8,
        userId: 21,
        institutionId: 16,
        endorsementId: 508,
    },
    {
        id: 9,
        userId: 23,
        institutionId: 15,
        endorsementId: 509,
    },
    {
        id: 10,
        userId: 25,
        institutionId: 16,
        endorsementId: 510,
    },
];

insertData(Issuers, issuersData, { validate: true, returning: false });
