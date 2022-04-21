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
  body("lastActive").notEmpty().isDate({ format: "MM/DD/YYYY" }),
  body("currentlyFostering").notEmpty().isBoolean(),
  body("pastFosters").notEmpty().isNumeric(),
  body("ambassador").notEmpty().isMongoId(),
  body("coordinator").notEmpty().isMongoId(),
  body("accountStatus").notEmpty().isString(),
];

/**
 * POST /users - Create an user
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createUser(req.body)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(500);
    });
});

/**
 * POST /users/login - Login user by verifying email and password
 */
router.post(
  "/login",
  [...validators.map((validator) => validator.optional()), validateRequest],
  (req, res, next) => {
    checkCredentials(req.body)
      .then((output) => {
        if (output) {
          res.status(200).json({ output });
        } else {
          throw new Error("Email or Password is incorrect");
        }
      })
      .catch((err) => {
        res.status(500);
      });
  }
);

/**
 * GET /users/:userId - get a user profile based on its ID
 */
router.get("/:userId", (req, res, next) => {
  getUser(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(500).json({
          message: `Something went wrong, User could not be found`,
        });
      }
    })
    .catch((err) => {
      res.status(500);
    });
});

module.exports = router;
