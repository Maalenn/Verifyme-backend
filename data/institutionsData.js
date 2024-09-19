const Institutions  = require("../models/Institutions");
const insertData = require("./insertData");

const institutions = [
    {
        userId: 2,
        name: "Tech Innovators",
        bio: "A leading institution in technology innovations, fostering growth and development.",
        email: "contact@techinnovators.com",
        phoneNumber: "1234567890",
        websiteUrl: "https://www.techinnovators.com",
        profileImage: "https://www.techinnovators.com/profile.jpg",
        stripeCustomerId: "cus_TECH123456"
    },
    {
        userId: 2,
        name: "Health First",
        bio: "Committed to providing top-notch healthcare and wellness services.",
        email: "info@healthfirst.com",
        phoneNumber: "0987654321",
        websiteUrl: "https://www.healthfirst.com",
        profileImage: "https://www.healthfirst.com/profile.jpg",
        stripeCustomerId: "cus_HEALTH654321"
    },
    {
        userId: 2,
        name: "Green Planet",
        bio: "Dedicated to environmental sustainability and eco-friendly practices.",
        email: "support@greenplanet.org",
        phoneNumber: "1122334455",
        websiteUrl: "https://www.greenplanet.org",
        profileImage: "https://www.greenplanet.org/profile.jpg",
        stripeCustomerId: "cus_GREEN789012"
    }
];

insertData(Institutions, institutions, {validate: false})
