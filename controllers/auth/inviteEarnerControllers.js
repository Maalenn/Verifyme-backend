const { Institutions, Issuers } = require("../../models");

const CodeInvitationService = require("../../services/codeInvitationServices");

const inviterModel = Issuers;
const inviterParamName = "issuerId";
const roleId = 3;
const signupLink = "http://localhost:5173/join-invitation?as=issuer";
const inviterCode = "institutionCode";
const inviterName = "institutionName";

const inviteIssuerService = new CodeInvitationService(
    inviterModel,
    inviterParamName,
    roleId,
    signupLink,
    inviterCode,
    inviterName,
);

// Controller to handle inviting issuers
exports.inviteIssuer = (req, res, next) => {
    inviteIssuerService.sendInvitation(req, res, next);
};

exports.verifyIssuerInvitation = (req, res, next) => {
    inviteIssuerService.verifyInvitation(req, res, next);
};


