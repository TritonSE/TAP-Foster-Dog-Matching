const express = require("express");
const { body } = require("express-validator");
const { validateCredenditals, updateAdmin, createAdmin } = require("../services/admins");
const { validateRequest } = require("../middleware/validation");

const router = express.Router();

const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").notEmpty().isString(),
  body("password").notEmpty().isString(),
  body("phone").notEmpty().isString(),
  body("role").notEmpty().isString(),
  body("photoURL").notEmpty().isString(),
  body("schedule").notEmpty().isObject(),
];

/**
 * POST /admin - Create an admin
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createAdmin(req.body)
    .then((admin) => {
      res.status(200).json({ admin });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * PUT /admin/:adminId - Update a admin profile
 */
router.put(
  "/:adminId",
  [...validators.map((validator) => validator.optional()), validateRequest], // all fields for update are optional
  (req, res, next) => {
    updateAdmin(req.params.adminId, req.body)
      .then((admin) => {
        if (admin) {
          res.status(200).json({
            admin,
          });
        } else {
          throw new Error("admin profile was not updated.");
        }
      })
      .catch((err) => {
        next(err);
      });
  }
);

/**
 * POST /admin/login - Login and check username and password
 */
router.post("/login", [...validators, validateRequest], (req, res, next) => {
  validateCredenditals(req.body)
    .then((admin) => {
      if (admin) {
        res.status(200).json({ admin });
      } else {
        throw new Error("Email or Password is incorrect");
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
