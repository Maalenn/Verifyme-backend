const express = require("express");
const router = express.Router();
const codeInvitationControllers = require("../../controllers/auth/inviteIssuerControllers");

router.route("/verifyAsIssuer").post(codeInvitationControllers.verifyIssuerInvitation);

module.exports = router;
