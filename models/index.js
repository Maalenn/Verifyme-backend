const Users = require("./Users");
const Roles = require("./Roles");
const Genders = require("./Genders");
const Address = require("./Addresses");
const AcademicLevels = require("./AcademicLevels");
const FieldOfStudies = require("./FieldOfStudies");
const AcademicBackgrounds = require("./AcademicBackgrounds");
const Specializations = require("./Specializations");
const Courses = require("./Courses");
const Institutions = require("./Institutions");
const ServicePlans = require("./ServicePlans");
const Subscriptions = require("./Subscriptions");
const Payments = require("./Payments");
const Issuers = require("./Issuers");
const Criterias = require("./Criterias");
const BadgeClasses = require("./BadgeClasses");
const AchievementTypes = require("./AchievementTypes");
const Achievements = require("./Achievements");
const BadgeCriteriaItems = require("./BadgeCriteriaItems");
const Earners = require("./Earners");
const InviteUsers = require("./InviteUsers");

// ============ Start Users Association ============
// User & Address association
Users.hasMany(Address, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Address.belongsTo(Users, {
    foreignKey: "userId",
});

// User & Gender association
Genders.hasMany(Users, {
    foreignKey: "genderId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Users.belongsTo(Genders, {
    foreignKey: "genderId",
});

// User & Role association
Roles.hasMany(Users, {
    foreignKey: "roleId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Users.belongsTo(Roles, {
    foreignKey: "roleId",
});

// Users & AcademicBackgrounds | Note: Users has roleId = 4 => Recipient
Users.hasMany(AcademicBackgrounds, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
AcademicBackgrounds.belongsTo(Users, {
    foreignKey: "userId",
});

// ============ End Users Association ============

// ============ Start Academics Association (for earner) ============
// AcademicBackgrounds & Institution
Institutions.hasMany(AcademicBackgrounds, {
    foreignKey: "institutionId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
AcademicBackgrounds.belongsTo(Institutions, {
    foreignKey: "institutionId",
});

// AcademicBackground & FieldOfStudy association
AcademicBackgrounds.belongsTo(FieldOfStudies, {
    foreignKey: "fieldOfStudyId",
});
FieldOfStudies.hasMany(AcademicBackgrounds, {
    foreignKey: "fieldOfStudyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// AcademicBackground & AcademicLevel
AcademicBackgrounds.belongsTo(AcademicLevels, {
    foreignKey: "academicLevelId",
});
AcademicLevels.hasMany(AcademicBackgrounds, {
    foreignKey: "academicLevelId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// FieldOfStudy Specification
FieldOfStudies.hasMany(Specializations, {
    foreignKey: "fieldOfStudyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Specializations.belongsTo(FieldOfStudies, {
    foreignKey: "fieldOfStudyId",
});

// FieldOfStudies & Courses
FieldOfStudies.hasMany(Courses, {
    foreignKey: "fieldOfStudyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Courses.belongsTo(FieldOfStudies, {
    foreignKey: "fieldOfStudyId",
});

// Courses & Specification
Specializations.hasMany(Courses, {
    foreignKey: "specializationId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Courses.belongsTo(Specializations, {
    foreignKey: "specializationId",
});

// ============ End Academics Association (for earner) ============

// ============ Start Payments Association ============
// ServicePlans & Subscriptions
ServicePlans.hasMany(Subscriptions, {
    foreignKey: "servicePlanId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Subscriptions.belongsTo(ServicePlans, {
    foreignKey: "servicePlanId",
});

// Institution & Subscription
Institutions.hasMany(Subscriptions, {
    foreignKey: "institutionId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Subscriptions.belongsTo(Institutions, {
    foreignKey: "institutionId",
});

// Payments & Subscription
Subscriptions.hasMany(Payments, {
    foreignKey: "subscriptionId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Payments.belongsTo(Subscriptions, {
    foreignKey: "subscriptionId",
});
// ============ End Payments Association ============

// ============ Start Institutions Association ============
// Users & Institution
Users.hasOne(Institutions, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Institutions.belongsTo(Users, {
    foreignKey: "userId",
});

// Institution & Address
Institutions.hasMany(Address, {
    foreignKey: "institutionId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Address.belongsTo(Institutions, {
    foreignKey: "institutionId",
});
// ============ End Institutions Association ============

// ============ Start Issuers Association ============
//Issuers & Users | Note: Users has roleId = 3 => Issuer
Users.hasMany(Issuers, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Issuers.belongsTo(Users, {
    foreignKey: "userId",
});

// Issuers & Institution
Institutions.hasMany(Issuers, {
    foreignKey: "institutionId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Issuers.belongsTo(Institutions, {
    foreignKey: "institutionId",
});

Issuers.hasMany(Earners, {
    foreignKey: "issuerId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

Earners.belongsTo(Issuers, {
    foreignKey: "issuerId"
})
// ============ End Issuers Association ============

// ============ Start BadgeClasses Association ============
// BadgeClasses & Criterias
BadgeClasses.hasMany(Criterias, {
    foreignKey: "badgeClassId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Criterias.belongsTo(BadgeClasses, {
    foreignKey: "badgeClassId",
});

// BadgeClasses & Issuers \
Issuers.hasMany(BadgeClasses, {
    foreignKey: "issuerId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
BadgeClasses.belongsTo(Issuers, {
    foreignKey: "issuerId",
});
// ============ End BadgeClass Association ============

// ============ Start Achievements  Association ============
// Achievements & AchievementTypes
Achievements.belongsTo(AchievementTypes, {
    foreignKey: "achievementTypeId",
});
AchievementTypes.hasMany(Achievements, {
    foreignKey: "achievementTypeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Achievements & BadgeClasses
BadgeClasses.hasMany(Achievements, {
    foreignKey: "badgeClassId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Achievements.belongsTo(BadgeClasses, {
    foreignKey: "badgeClassId",
});

// Achievements & Criterias through BadgeCriteriaItems
Achievements.hasMany(BadgeCriteriaItems, {
    foreignKey: "achievementsId", // This should match the foreign key in BadgeCriteriaItems
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

BadgeCriteriaItems.belongsTo(Achievements, {
    foreignKey: "achievementsId",
});

Criterias.hasMany(BadgeCriteriaItems, {
    foreignKey: "criteriasId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

BadgeCriteriaItems.belongsTo(Criterias, {
    foreignKey: "criteriasId", // This should match the foreign key in BadgeCriteriaItems
});
// ============ End Achievements  Association ============

// ============ Start Earners Association ============
//Earner & Users | Note: Users has roleId = 4 => Recipients
Users.hasMany(Earners, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Earners.belongsTo(Users, {
    foreignKey: "userId",
});

// Earner & AcademicBackgrounds
Earners.belongsTo(AcademicBackgrounds, {
    foreignKey: "academicBackgroundId",
});
AcademicBackgrounds.hasMany(Earners, {
    foreignKey: "academicBackgroundId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Achievements & Earner
Achievements.hasMany(Earners, {
    foreignKey: "achievementId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Earners.belongsTo(Achievements, {
    foreignKey: "achievementId",
});
// ============ End Earners Association ============

// ============ Start Invite User ============
InviteUsers.belongsTo(Roles, {
    foreignKey: "roleId",
});
Roles.hasMany(InviteUsers, {
    foreignKey: "roleId",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
});
// ============ End Invite User   ============

module.exports = {
    Users,
    Roles,
    Genders,
    Address,
    AcademicLevels,
    FieldOfStudies,
    AcademicBackgrounds,
    Specializations,
    Courses,
    Institutions,
    ServicePlans,
    Subscriptions,
    Payments,
    Issuers,
    Criterias,
    BadgeClasses,
    AchievementTypes,
    Achievements,
    Earners,
    BadgeCriteriaItems,
    InviteUsers,
};
