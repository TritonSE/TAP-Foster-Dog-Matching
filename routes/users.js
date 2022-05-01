const express = require("express");
const { body } = require("express-validator");
const { createUser, getUser } = require("../services/users");
const { validateRequest } = require("../middleware/validation");

const router = express.Router();

const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString().isLength({ min: 6 }),
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
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createUser(req.body)
    .then((user) => {
      if (user) {
        return res.status(200).json({ user });
      }
      return res.status(400).json({
        errors: [{ msg: "Unsuccessful user creation/ enter valid User data" }],
      });
    })
    .catch((err) => next(err));
});

/**
 * GET /users/:userId - get a user profile based on its ID
 */
router.get("/:userId", (req, res, next) => {
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
    .catch((err) => next(err));
});

module.exports = router;
