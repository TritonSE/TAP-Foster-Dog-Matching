const express = require("express");
const { body } = require("express-validator");
const { sendEmail } = require("./services/mailer");
const { validateRequest } = require("../middleware/validation");
const config = require("../config");

const router = express.Router();

const validators = [
  body("name").notEmpty().isString(),
  body("team").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("message").notEmpty().isString(),
  body("toEmail").notEmpty().isString().isEmail(),
];

/**
 * Adds user to DB.
 *
 * @returns {status} - 200 - with created item.
 */
router.post("/", [...validators, validateRequest], async (req, res) => {
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

    if (sent) return res.sendStatus(200);
    return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

module.exports = router;
