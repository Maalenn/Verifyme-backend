const Users = require("../../models/Users");
const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");

const BaseControllers = require("../../utils/baseControllers");

const userControllers = new BaseControllers(Users, ["username", "email"], [Roles, Genders], 'profileImage');

module.exports = userControllers;
