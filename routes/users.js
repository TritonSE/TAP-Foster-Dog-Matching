const express = require("express");
const { body } = require("express-validator");
const { createUser, getUser, getUsers } = require("../services/users");
const { validateRequest } = require("../middleware/validation");
const { requireAuthenticatedUserOrAdminRoles } = require("../middleware/auth");
const { requireAuthenticatedAdmin } = require("../middleware/auth");

const { ADMIN_ROLES } = require("../services/admins");

const router = express.Router();
const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters"),
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


/**
 * GET / - Return all pending applications depending on role
 *  - Management gets all pending applications
 *  - Other admins gets only pending applications assigned to them
 */
router.get("/", [requireAuthenticatedAdmin], (req, res, next) => {
  const options = {};
  const adminRole = req.currentUser.role;
  if (adminRole !== "management") {
    options.ambassador = req.currentUser._id;
  }
  getUsers(options)
    .then((applications) => {
      res.status(200).json({
        applications,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
