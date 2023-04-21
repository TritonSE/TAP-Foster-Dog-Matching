const express = require("express");
const multer = require("multer");
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
const { uploadImage } = require("../services/image");

const router = express.Router();
const upload = multer();

const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters"),
  body("phone").isString().isMobilePhone("en-US"),
  body("role").notEmpty().isString().isIn(Object.values(ADMIN_ROLES)),
  body("schedule").isObject(),
];

/**
 * POST /admins - Create an admin
 *
 * To only validate the fields (w/o creating an admin), set validateOnly: true in the body
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  const {
    body: { validateOnly },
  } = req;
  createAdmin(req.body, validateOnly)
    .then((admin) => {
      if (validateOnly) {
        return res.status(200).json({
          valid: true,
        });
      }
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
 * PUT /admins/photo/:adminId - Update a admin profile image
 */
router.put(
  "/photo/:adminId",
  [requireAuthenticatedAdmin, upload.single("image")],
  (req, res, next) => {
    const { adminId } = req.params;
    uploadImage(`profile/${adminId}.jpg`, req.file)
      .then((photoURL) => updateAdmin(adminId, { photoURL }))
      .then((admin) =>
        res.status(200).json({
          admin,
        })
      )
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
