const express = require("express");
const router = express.Router();

const userRouters = require("./userRouter");
const roleRouters = require("./roleRouters");
const genderRouters = require("./genderRouters");
const addressRouters = require("./addressRoutes");

router.use("/", userRouters);
router.use("/roles", roleRouters);
router.use("/genders", genderRouters);
router.use("/addresses", addressRouters);

module.exports = router;
