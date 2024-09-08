const express = require("express");
const router = express.Router();

const roleRouters = require("./roleRouters");
const genderRouters = require("./genderRouters");

router.use("/roles", roleRouters);
router.use("/genders", genderRouters);

module.exports = router;
