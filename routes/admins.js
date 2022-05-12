const express = require("express");
const { body } = require("express-validator");
const {
  updateAdmin,
  createAdmin,
  getAdmin,
  getAdmins,
  ADMIN_ROLES,
} = require("../services/admins");
const { validateRequest } = require("../middleware/validation");
const { requireAuthentication, requireAuthenticatedAdmin } = require("../middleware/auth");

const router = express.Router();

const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString().isLength({ min: 6 }),
  body("phone").notEmpty().isString().isMobilePhone("en-US"),
  body("role").notEmpty().isString().isIn(Object.values(ADMIN_ROLES)),
  body("photoURL").notEmpty().isString().isURL(),
  body("schedule").isObject().notEmpty(),
];

/**
 * POST /admins - Create an admin
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createAdmin(req.body)
    .then((admin) => {
      if (admin) {
        return res.status(200).json({
          admin,
        });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, new Admin could not be created` }],
      });
    })
    .catch((err) => next(err));
});

/**
 * PUT /admins/:adminId - Update a admin profile
 */
router.put(
  "/:adminId",
  [
    ...validators.map((validator) => validator.optional()), // all fields for update are optional
    validateRequest,
    requireAuthenticatedAdmin,
  ],
  (req, res, next) => {
    updateAdmin(req.params.adminId, req.body)
      .then((admin) => {
        if (admin) {
          return res.status(200).json({
            admin,
          });
        }
        return res.status(400).json({
          errors: [{ message: `Something went wrong, Admin could not be updated` }],
        });
      })
      .catch((err) => next(err));
  }
);

/**
 * GET /admins/:adminId - get a admin profile based on its ID
 */
router.get("/:adminId", [requireAuthentication], (req, res, next) => {
  getAdmin(req.params.adminId)
    .then((admin) => {
      if (admin) {
        return res.status(200).json({
          admin,
        });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, Admin could not be found` }],
      });
    })
    .catch((err) => next(err));
});

/**
 * GET /admins - get all admins
 */
router.get("/", [requireAuthenticatedAdmin], (req, res, next) => {
  getAdmins()
    .then((admin) => {
      if (admin) {
        return res.status(200).json({
          admin,
        });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, Admins could not be retrieved` }],
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
