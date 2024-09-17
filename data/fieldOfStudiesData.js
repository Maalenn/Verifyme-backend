const FieldOfStudies = require("../models/FieldOfStudies");
const insertData = require("../utils/insertData");

const fieldOfStudies = [
    {
        name: "Computer Science",
        description: "The study of computational systems and computers.",
    },
    {
        name: "Mechanical Engineering",
        description:
            "Engineering discipline focused on the design and manufacturing of mechanical systems.",
    },
    {
        name: "Electrical Engineering",
        description: "The branch of engineering that deals with the study of electrical systems.",
    },
    {
        name: "Biology",
        description: "The science of life and living organisms.",
    },
    {
        name: "Chemistry",
        description: "The study of matter and the changes it undergoes.",
    },
    {
        name: "Physics",
        description:
            "The natural science that studies matter, energy, and the fundamental forces of nature.",
    },
    {
        name: "Mathematics",
        description: "The abstract science of numbers, quantity, and space.",
    },
    {
        name: "Psychology",
        description: "The scientific study of behavior and mental processes.",
    },
    {
        name: "Economics",
        description:
            "The social science that studies the production, distribution, and consumption of goods and services.",
    },
    {
        name: "Sociology",
        description: "The study of society, social relationships, and social institutions.",
    },
    {
        name: "History",
        description: "The study of past events, particularly in human affairs.",
    },
    {
        name: "Philosophy",
        description: "The study of fundamental questions about existence, knowledge, and ethics.",
    },
    {
        name: "Business Administration",
        description: "The study of business operations and management.",
    },
    {
        name: "Law",
        description:
            "The system of rules created and enforced by social or governmental institutions.",
    },
    {
        name: "Medicine",
        description: "The science and practice of diagnosing, treating, and preventing disease.",
    },
    {
        name: "Art History",
        description: "The study of art and its development over time.",
    },
    {
        name: "Education",
        description: "The study of teaching and learning methods.",
    },
    {
        name: "Environmental Science",
        description: "The study of the environment and solutions to environmental problems.",
    },
    {
        name: "Graphic Design",
        description: "The art and practice of visual communication.",
    },
    {
        name: "Theater Arts",
        description: "The study of performing arts, including acting, directing, and stagecraft.",
    },
];

// Call the insert function with different models and data
insertData(FieldOfStudies, fieldOfStudies, { validate: true, returning: false });
