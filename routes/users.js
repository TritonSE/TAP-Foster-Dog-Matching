const express = require("express");
const { body } = require("express-validator");
const { createUser, checkCredentials } = require("../services/users");
const { validateRequest } = require("../middleware/validation");

const router = express.Router();

const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").notEmpty().isString(),
  body("password").notEmpty().isString(),
  body("role").notEmpty().isString(),
  body("lastActive").notEmpty().isDate(),
  body("currentlyFostering").notEmpty().isBoolean(),
  body("pastFosters").notEmpty().isNumeric(),
  body("ambassador").notEmpty().isObjectId(),
  body("coordinator").notEmpty().isObjectId(),
  body("accountStatus").notEmpty().isString(),
];

/**
 * POST /user - Create an user
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createUser(req.body)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * POST /user - Login user by verifying email and password
 */
router.post("/login", [...validators, validateRequest], (req, res, next) => {
  checkCredentials(req.body)
    .then((output) => {
      if (output) {
        res.status(200).json({ output });
      } else {
        throw new Error("Username or password is invalid");
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
