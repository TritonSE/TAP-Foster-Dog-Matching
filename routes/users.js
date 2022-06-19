const express = require("express");
const { body } = require("express-validator");
const { createUser, getUser } = require("../services/users");
const { validateRequest } = require("../middleware/validation");
const { requireAuthenticatedUserOrAdminRoles } = require("../middleware/auth");
const { ADMIN_ROLES } = require("../services/admins");

const router = express.Router();
// TODO make applications route add new application to assosciated user
const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("applications").isArray(),
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString().isLength({ min: 8 }),
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
router.get(
  "/:userId",
  [requireAuthenticatedUserOrAdminRoles(ADMIN_ROLES.MANAGEMENT, ADMIN_ROLES.COORDINATOR)],
  (req, res, next) => {
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
  }
);

module.exports = router;
