const express = require("express");
const router = express.Router();

const genderControllers = require("../../controllers/users/genderControllers");

router.route("/").get(genderControllers.getAll).post(genderControllers.createOne);

module.exports = router;
