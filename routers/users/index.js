const express = require("express");
const router = express.Router();

const roleRouters = require("./roleRouters");
const genderRouters = require("./genderRouters");
const userRouters = require("./userRouter");

router.use("/roles", roleRouters);
router.use("/genders", genderRouters);
router.use("/", userRouters);

module.exports = router;
