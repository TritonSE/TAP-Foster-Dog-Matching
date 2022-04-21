const express = require("express");
const { body } = require("express-validator");
const { createUser, checkCredentials, getUser } = require("../services/users");
const { validateRequest } = require("../middleware/validation");

const router = express.Router();

const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString(),
  body("role").notEmpty().isString(),
  body("lastActive").notEmpty().isDate({ format: "MM/DD/YY" }),
  body("currentlyFostering").notEmpty().isBoolean(),
  body("pastFosters").notEmpty().isNumeric(),
  body("ambassador").notEmpty().isMongoId(),
  body("coordinator").notEmpty().isMongoId(),
  body("accountStatus").notEmpty().isString(),
];

/**
 * POST /users - Create an user
 */
router.post("/", [...validators, validateRequest], (req, res) => {
  createUser(req.body)
    .then((user) => {
      if (user) {
        return res.status(200).json({ user });
      }
      return res.status(400).json({
        errors: [{ msg: "Unsuccessful user creation/ enter valid User data" }],
      });
    })
    .catch(() => {
      res.status(500).send("Server err/ enter valid User data");
    });
});

/**
 * POST /users/login - Login user by verifying email and password
 */
router.post(
  "/login",
  [...validators.map((validator) => validator.optional()), validateRequest],
  (req, res) => {
    checkCredentials(req.body)
      .then((output) => {
        if (output) {
          return res.status(200).json({ output });
        }
        return res.status(400).json({
          errors: [{ msg: "Unsuccessful authentication/ Email or Password is incorrect" }],
        });
      })
      .catch(() => {
        res.status(500).send("Server err/ Email or Password is incorrect");
      });
  }
);

/**
 * GET /users/:userId - get a user profile based on its ID
 */
router.get("/:userId", (req, res) => {
  getUser(req.params.userId)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          user,
        });
      }
      return res.status(400).json({
        errors: [{ msg: "Unsuccessful user retrieval/ enter valid userId" }],
      });
    })
    .catch(() => {
      res.status(500).send("Server err/ user could not be found");
    });
});

module.exports = router;
