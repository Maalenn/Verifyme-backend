const AchievementTypes = require("../models/AchievementTypes");
const insertData = require("../utils/insertData");

const achievementTypesData = [
    {
        name: "Achievement",
        description:
            "A general term for any accomplishment or milestone recognized for completing a specific task or reaching a goal.",
    },
    {
        name: "ApprenticeshipCertificate",
        description:
            "A certification awarded upon completing an apprenticeship program, indicating the individual has acquired practical skills and experience in a particular trade or profession.",
    },
    {
        name: "Assessment",
        description:
            "Recognition awarded after the completion of an evaluative process that measures knowledge, skills, or competencies in a specific area.",
    },
    {
        name: "Assignment",
        description:
            "A certificate or acknowledgment given upon the successful completion of a specific academic or professional task or project.",
    },
    {
        name: "AssociateDegree",
        description:
            "An academic degree awarded upon the completion of a two-year program at a community college or junior college, often as a precursor to a bachelor's degree.",
    },
    {
        name: "Award",
        description:
            "A formal recognition for outstanding performance or achievement in a particular field, which could be in the form of a trophy, certificate, or other honor.",
    },
    {
        name: "Badge",
        description:
            "A symbolic token or digital marker awarded for completing certain tasks, achieving milestones, or demonstrating skills, often used in educational or professional settings.",
    },
    {
        name: "BachelorDegree",
        description:
            "An undergraduate academic degree awarded after the completion of a college or university program, typically lasting four years, in a specific field of study.",
    },
    {
        name: "Certificate",
        description:
            "A document certifying the completion of a specific course or program, recognizing the acquisition of certain skills or knowledge.",
    },
    {
        name: "CertificateOfCompletion",
        description:
            "A document awarded upon finishing a course or training program, signifying that the individual has completed all required components.",
    },
    {
        name: "Certification",
        description:
            "A formal recognition, usually involving an examination or assessment, that an individual has met specific professional or educational standards in a particular field.",
    },
    {
        name: "CommunityService",
        description:
            "An acknowledgment for voluntary work or contributions made to benefit the community, demonstrating commitment to civic engagement and social responsibility.",
    },
    {
        name: "Competency",
        description:
            "A recognition of demonstrated ability or skill in a specific area, often assessed through practical application or testing.",
    },
    {
        name: "Course",
        description:
            "A series of instructional sessions or lessons on a particular subject, with a certificate or acknowledgment given upon successful completion.",
    },
    {
        name: "CoCurricular",
        description:
            "A certificate or recognition for activities that complement the main curriculum, such as clubs, sports, or other extracurricular activities that contribute to personal development.",
    },
    {
        name: "Degree",
        description:
            "An academic qualification awarded by a higher education institution, indicating the completion of a course of study at various levels, such as associate, bachelor, master, or doctoral degrees.",
    },
    {
        name: "Diploma",
        description:
            "An official document certifying the completion of a specific educational program, often awarded at the end of secondary education or higher education.",
    },
    {
        name: "DoctoralDegree",
        description:
            "The highest level of academic degree, awarded upon completion of advanced research and study, typically involving a dissertation or thesis in a specialized field.",
    },
    {
        name: "Fieldwork",
        description:
            "A recognition for hands-on, practical experience gained through direct engagement in a particular field of study or profession, often required as part of academic programs.",
    },
    {
        name: "GeneralEducationDevelopment",
        description:
            "A certificate awarded to individuals who have demonstrated high school-level academic skills through the General Education Development (GED) test, often serving as a high school equivalency credential.",
    },
    {
        name: "JourneymanCertificate",
        description:
            "A certification indicating that an individual has completed an apprenticeship and achieved proficiency in a trade, qualifying them as a skilled worker.",
    },
    {
        name: "License",
        description:
            "An official permit granting permission to practice a profession or use certain skills, often regulated by a governing body and requiring ongoing compliance with professional standards.",
    },
    {
        name: "Membership",
        description:
            "An acknowledgment of joining a professional organization, society, or association, often providing access to resources, networks, and professional development opportunities.",
    },
    {
        name: "ProfessionalDoctorate",
        description:
            "An advanced academic degree that focuses on professional practice and applied research in a specific field, such as a Doctor of Medicine (MD) or Doctor of Business Administration (DBA).",
    },
    {
        name: "QualityAssuranceCredential",
        description:
            "A certification demonstrating expertise in quality assurance practices and standards, often relevant in fields such as manufacturing, software development, or project management.",
    },
    {
        name: "MasterCertificate",
        description:
            "A specialized credential recognizing advanced knowledge or skills in a specific area, often part of a professional development program or certification track.",
    },
    {
        name: "MasterDegree",
        description:
            "An advanced academic degree awarded after completing graduate-level coursework, typically requiring one to two years of study beyond a bachelor's degree, in a specific field of study.",
    },
    {
        name: "MicroCredential",
        description:
            "A short, focused certification that verifies specific skills or knowledge in a particular area, often used to recognize achievements in continuing education or professional development.",
    },
    {
        name: "ResearchDoctorate",
        description:
            "The highest academic degree, focusing on original research and contributing new knowledge to a specific field, typically culminating in a dissertation or thesis.",
    },
    {
        name: "SecondarySchoolDiploma",
        description:
            "A certificate awarded upon completing secondary or high school education, signifying that the individual has met the required academic standards for graduation.",
    },
];

// Call the insert function with different models and data
insertData(AchievementTypes, achievementTypesData, { validate: true, returning: false });
