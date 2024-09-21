const BaseController = require("../../utils/baseControllers");
const Images = require("../../models/Images");

const imageController = new BaseController(Images, [], [], "profileImage");
module.exports = imageController;
