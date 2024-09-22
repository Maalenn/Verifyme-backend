const EmailService = require("./mailServices");
const { inviteCodeTemplate } = require("../templates/inviteCodeTemplate");
const { InviteUsers, Users } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op, where } = require("sequelize");

class CodeInvitationService {
    constructor(inviterModel, inviterParamName, roleId, signupLink, inviterCode, inviterName) {
        this.inviterModel = inviterModel;
        this.inviterParamName = inviterParamName;
        this.roleId = roleId;
        this.signupLink = signupLink;
        this.inviterCode = inviterCode;
        this.inviterName = inviterName;
    }

    sendInvitation = catchAsync(async (req, res, next) => {
        const { email } = req.body;
        const inviterId = req.params[this.inviterParamName];

        // Find institution by ID
        const inviter = await this.inviterModel.findByPk(inviterId);

        if (!inviter) {
            return next(new AppError("Inviter not found", 404));
        }

        const inviterCodeValues = inviter[this.inviterCode];
        const inviterNameValue = inviter[this.inviterName];

        // Create an invitation in the database
        const guest = await InviteUsers.create({
            inviteEmail: email,
            roleId: this.roleId,
            inviterCode: inviterCodeValues,
        });

        // Prepare the invite email template dynamically
        const emailTemplate = inviteCodeTemplate
            .replace(/\[Institution Name\]/g, inviterNameValue)
            .replace("[Badge Platform]", "RatifyMe")
            .replace("[INVITE CODE]", inviterCodeValues)
            .replace("[SIGNUP_LINK]", this.signupLink)
            .replace("[Badge Platform Name]", "RatifyMe");

        // Send the email using the email service
        const emailService = new EmailService();
        await emailService.sendInviteCode(email, emailTemplate);

        // Return success response
        res.status(200).json({
            message: `Invitation sent to ${email} successfully!`,
            guest,
            inviter,
        });
    });

    verifyInvitation = catchAsync(async (req, res, next) => {
        const { inviteEmail, inviterCode } = req.body;

        const checkValidGuest = await InviteUsers.findOne({
            where: {
                inviterCode,
                inviteEmail,
                inviteExpires: { [Op.gt]: Date.now() },
            },
        });

        // Check if the invite email exists
        if (!checkValidGuest) {
            const codeExists = await InviteUsers.findOne({ where: { inviterCode } });
            const emailExists = await InviteUsers.findOne({ where: { inviteEmail } });

            if (!codeExists && !emailExists) {
                return next(
                    new AppError(
                        `Both inviter code '${inviterCode}' and email '${inviteEmail}' are invalid.`,
                        400,
                    ),
                );
            } else if (!codeExists) {
                return next(new AppError(`The inviter code '${inviterCode}' is invalid.`, 400));
            } else if (!emailExists) {
                return next(
                    new AppError(
                        `The invitation for email '${inviteEmail}' has expired or is invalid.`,
                        400,
                    ),
                );
            }
        }

        // Retrieve inviter's info from Institutions based on the valid inviterCode
        const checkInviter = await this.inviterModel.findOne({
            where: { code: inviterCode }, // Assuming 'code' is the inviter's field in Institutions model
        });

        // Check if inviter info is found
        if (!checkInviter) {
            return next(new AppError(`No inviter found for code '${inviterCode}'.`, 404));
        }

        const checkExistAccount = await Users.findOne({
            where: { email: checkValidGuest.inviteEmail },
        });

        // Mark the invitation as verified
        checkValidGuest.status = true;
        await checkValidGuest.save({ validate: false });

        res.status(200).json({
            message: `Invitation verified successfully`,
            inviter: checkInviter,
            guest: checkValidGuest,
            user: checkExistAccount,
        });
    });
}

module.exports = CodeInvitationService;
