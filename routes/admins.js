const express = require("express");
const { body } = require("express-validator");
const {
  validateCredenditals,
  updateAdmin,
  createAdmin,
  getAdmin,
  getAdmins,
} = require("../services/admins");
const { validateRequest } = require("../middleware/validation");

const router = express.Router();

const validators = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  body("password").notEmpty().isString(),
  body("phone").notEmpty().isString().isMobilePhone("en-US"),
  body("role").notEmpty().isString(),
  body("photoURL").notEmpty().isString().isURL(),
  body("schedule").isObject().notEmpty(),
];

/**
 * POST /admin - Create an admin
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createAdmin(req.body)
    .then((admin) => {
      if (admin) {
        res.status(200).json({
          admin,
        });
      } else {
        res.status(400).json({
          message: `Something went wrong, new Admin could not be created`,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("server error, admin could not be created");
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
          res.status(400).json({
            message: `Something went wrong, new Admin could not be updated`,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("server error, admin could not be updated");
      });
  }
);

/**
 * GET /admin/:adminId - get a admin profile based on its ID
 */
router.get("/:adminId", (req, res, next) => {
  getAdmin(req.params.adminId)
    .then((admin) => {
      if (admin) {
        res.status(200).json({
          admin,
        });
      } else {
        res.status(400).json({
          message: `Something went wrong, Admin could not be found`,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("server error, admin could not be retrieved");
    });
});

/**
 * GET /admin - get all admins
 */
router.get("/", (req, res, next) => {
  getAdmins()
    .then((admin) => {
      if (admin) {
        res.status(200).json({
          admin,
        });
      } else {
        res.status(400).json({
          message: `Something went wrong, Admins could not be retrieved`,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("server error, admins could not be retrieved");
    });
});

/**
 * POST /admin/login - Login and check username and password
 */
router.post(
  "/login",
  [...validators.map((validator) => validator.optional()), validateRequest],
  (req, res, next) => {
    validateCredenditals(req.body)
      .then((admin) => {
        if (admin) {
          res.status(200).json({ admin });
        } else {
          res.status(400).json({
            message: `Something went wrong, Email or password is incorrect`,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("server error, admin could not log in");
      });
  }
);

module.exports = router;
