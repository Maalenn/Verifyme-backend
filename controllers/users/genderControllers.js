const Genders = require("../../models/Genders");
const BaseController = require("../../utils/baseControllers");

const genderControllers = new BaseController(Genders);

module.exports = genderControllers;
