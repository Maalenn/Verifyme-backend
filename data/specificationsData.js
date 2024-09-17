const Specializations = require("../models/Specializations");
const insertData = require("../utils/insertData");

const specificationsData = [
    {
        name: "Artificial Intelligence",
        description: "Focuses on developing intelligent machines and systems.",
        fieldOfStudyId: 1,
    },
    {
        name: "Cybersecurity",
        description: "Study of protection of systems, networks, and data from digital attacks.",
        fieldOfStudyId: 1,
    },
    {
        name: "Robotics",
        description: "The design, construction, and operation of robots.",
        fieldOfStudyId: 2,
    },
    {
        name: "Thermodynamics",
        description: "Study of heat, energy, and the work done by machines.",
        fieldOfStudyId: 2,
    },
    {
        name: "Embedded Systems",
        description: "Design of specialized computing systems embedded into hardware devices.",
        fieldOfStudyId: 3,
    },
    {
        name: "Power Systems",
        description:
            "Study of large-scale electrical power generation, transmission, and distribution.",
        fieldOfStudyId: 3,
    },
    {
        name: "Genetics",
        description: "The study of genes, genetic variation, and heredity in living organisms.",
        fieldOfStudyId: 4,
    },
    {
        name: "Microbiology",
        description: "The study of microscopic organisms such as bacteria, viruses, and fungi.",
        fieldOfStudyId: 4,
    },
    {
        name: "Organic Chemistry",
        description: "The study of the structure, properties, and reactions of organic compounds.",
        fieldOfStudyId: 5,
    },
    {
        name: "Analytical Chemistry",
        description: "The analysis of material samples to understand their chemical composition.",
        fieldOfStudyId: 5,
    },
    {
        name: "Quantum Mechanics",
        description: "Study of physical phenomena at the scale of atoms and subatomic particles.",
        fieldOfStudyId: 6,
    },
    {
        name: "Astrophysics",
        description:
            "Branch of physics dealing with the behavior of celestial bodies and the universe.",
        fieldOfStudyId: 6,
    },
    {
        name: "Algebra",
        description: "Study of mathematical symbols and the rules for manipulating these symbols.",
        fieldOfStudyId: 7,
    },
    {
        name: "Calculus",
        description: "Mathematical study of continuous change.",
        fieldOfStudyId: 7,
    },
    {
        name: "Clinical Psychology",
        description:
            "Focuses on diagnosing and treating mental, emotional, and behavioral disorders.",
        fieldOfStudyId: 8,
    },
    {
        name: "Cognitive Psychology",
        description: "Study of mental processes such as perception, memory, and problem-solving.",
        fieldOfStudyId: 8,
    },
    {
        name: "Macroeconomics",
        description:
            "Study of economy-wide phenomena, such as inflation, national income, and economic growth.",
        fieldOfStudyId: 9,
    },
    {
        name: "Microeconomics",
        description: "Study of individual agents and markets, such as households and firms.",
        fieldOfStudyId: 9,
    },
    {
        name: "Criminal Law",
        description: "The system of law concerned with the punishment of offenders.",
        fieldOfStudyId: 14,
    },
    {
        name: "Corporate Law",
        description: "Deals with the formation and operations of corporations.",
        fieldOfStudyId: 14,
    },
];

// Call the insert function with different models and data
insertData(Specializations, specificationsData, { validate: true, returning: false });
