const express = require("express");
const router = express.Router();
const codeInvitationControllers = require("../../controllers/auth/inviteUserControllers");

router.route("/").post(codeInvitationControllers.verifyInvitation);

module.exports = router;
