const express = require("express");
const router = express.Router();

const userRouters = require("./userRouter");
const roleRouters = require("./roleRouters");
const genderRouters = require("./genderRouters");
const addressRouters = require("./addressRoutes");
const codeInvitation = require("./codeInvitationRoutes");
const verifyInvitation = require('./verifyInvitationRoutes')

router.use("/roles", roleRouters);
router.use("/genders", genderRouters);
router.use("/addresses", addressRouters);
router.use("/codeInvitation", codeInvitation);
router.use('/verifyInvitation', verifyInvitation)
router.use("/", userRouters);

module.exports = router;
