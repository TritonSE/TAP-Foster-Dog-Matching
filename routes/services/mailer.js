const nodemailer = require("nodemailer");
const Email = require("email-templates");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: 'jacobau.spam@gmail.com',
        pass: 'KitK@t123spam',
    }
});

const mail = new Email({
    transport: transporter,
    send: true,
    preview: false,
})

/**
 * Populates given email template with locals and sends it to to_email.
 * All emails are sent from the email account specified in dotenv.
 *
 * @param {string} template - Template email
 * @param {string} to_email - Email address(es) being sent to
 * @param {string} locals - Information that will populate the email template
 * @returns {object} - Mail object / err
 */
 async function sendEmail(template, to_email, locals) {
    // sends email only if mail has been successfully setup
    if (mail != null) {
        try {
            await mail.send({
                template,
                message: {
                    from: process.env.MAIL_USER,
                    to: to_email,
                },
                locals,
            });
        } catch (err) {
            console.error(`Error HERE: Email ${template} could not be sent to ${to_email}. \n${err}`);
            return false;
        }
        return true;
    }
    console.error(`Error: Email ${template} could not be sent to ${to_email}. Null mailer.`);
    return false;
}

module.exports = {
    sendEmail,
};
    