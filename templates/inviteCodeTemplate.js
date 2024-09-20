// inviteCodeTemplate.js
exports.inviteCodeTemplate = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Invitation to Join Badge Platform</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f7f7f7;
                    margin: 0;
                    padding: 0;
                }
                p {
                    color: #000 !important;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #1A87EC;
                    padding: 20px;
                    border-radius: 8px 8px 0 0;
                    color: #ffffff;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 20px 0;
                }
                .code-block {
                    background-color: #f0f0f0;
                    color: #000;
                    padding: 24px;
                    text-align: center;
                    border-radius: 4px;
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 1.5px;
                }
                .cta-button {
                    display: block;
                    width: 200px;
                    margin: 30px auto;
                    padding: 10px 20px;
                    background-color: #1A87EC;
                    color: #ffffff !important;
                    text-align: center;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 18px;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                    color: #999999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Invitation to Join [Institution Name]</h1>
                </div>
                <div class="content">
                    <p>Dear [Issuer Name],</p>
                    <p>
                        You’ve been invited by <strong>[Institution Name]</strong> to join their
                        badge-issuing program on the <strong>[Badge Platform]</strong>.
                    </p>
                    <p>To join, please use the following invitation code when signing up:</p>
                    <div class="code-block">[INVITE CODE]</div>
                    <p>Click the button below to get started and create your account.</p>
                    <a href="[SIGNUP_LINK]" class="cta-button">Create Account</a>
                    <p>If you have any questions or need assistance, feel free to contact us.</p>
                    <p>Best regards,<br />The RatifyMe Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 [Badge Platform Name]. All rights reserved.</p>
                </div>
            </div>
        </body>
    </html>
`;
