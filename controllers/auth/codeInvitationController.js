const EmailService = require("../../services/mailServices"); // Import the email service
const { inviteCodeTemplate } = require("../../templates/inviteCodeTemplate");
const { Issuers, Institutions } = require("../../models"); // Assuming these models exist

// Controller to handle invitation code email sending
exports.inviteIssuer = async (req, res, next) => {
    const { email } = req.body;

    try {
        // Find institution by ID
        const institution = await Institutions.findByPk(req.params.institutionId);
        if (!institution) {
            return res.status(404).json({ message: "Institution not found" });
        }
        const institutionName = institution.institutionName;
        const institutionCode = institution.institutionCode;

        // Prepare the invite email template
        const emailTemplate = inviteCodeTemplate
            .replace("[Issuer Name]", "Issuer")
            .replace(/\[Institution Name\]/g, institutionName)
            .replace("[Badge Platform]", "RatifyMe")
            .replace("[INVITE CODE]", institutionCode)
            .replace('[SIGNUP_LINK]', 'http://localhost:5173/join-invitation?as=issuer')
            .replace("[Badge Platform Name]", "RatifyMe");

        // Send the email using the email service
        const emailService = new EmailService();
        await emailService.sendInviteCode(email, emailTemplate);

        // Return success response
        res.status(200).json({ message: `Invitation sent to ${email} successfully!` });
    } catch (error) {
        console.error("Error inviting issuer:", error);
        res.status(500).json({ message: "Error sending invitation" });
    }
};
