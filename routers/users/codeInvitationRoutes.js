const express = require("express");
const router = express.Router();
const codeInvitationControllers = require("../../controllers/auth/codeInvitationController");

router.route("/inviteIssuer/:institutionId").post(codeInvitationControllers.inviteIssuer);

module.exports = router;
