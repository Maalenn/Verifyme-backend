const express = require("express");
const router = express.Router();
const codeInvitationControllers = require("../../controllers/auth/inviteUserControllers");

router.route("/inviteIssuer/:institutionId").post(codeInvitationControllers.inviteIssuer);
router.route("/inviteEarner/:issuerId").post(codeInvitationControllers.inviteEarner);

module.exports = router;
