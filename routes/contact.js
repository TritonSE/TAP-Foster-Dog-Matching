const express = require("express");
const { body } = require("express-validator");
const { sendEmail } = require("./services/mailer");
const { validateRequest } = require("../middleware/validation");
const { requireAuthentication } = require("../middleware/auth");
const { ServiceError } = require("../services/errors");

const router = express.Router();

const validators = [
  body("name").notEmpty().isString(),
  body("team").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("message").notEmpty().isString(),
  body("toEmail").notEmpty().isString().isEmail(),
];

/**
 * Send contact email.
 *
 * @returns {status} - 200 - with created item.
 */
router.post(
  "/",
  [...validators, validateRequest, requireAuthentication],
  async (req, res, next) => {
    try {
      const locals = {
        name: req.body.name,
        email: req.body.email,
        team: req.body.team,
        message: req.body.message,
      };
      console.log(JSON.stringify(locals));
      console.log(req.body.toEmail);

      // sends notifications that a user has submitted a message from contact page
      const sent = await sendEmail("message", req.body.toEmail, locals);
      if (sent) return res.status(200).json({ message: "Message sent!" });
      throw ServiceError(500, "Message was not sent.");
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
