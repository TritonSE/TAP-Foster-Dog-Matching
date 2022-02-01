const express = require("express");
const { body } = require("express-validator");
const { getApplication, createApplication, updateApplication } = require("../services/application");
const { validateRequest } = require("../middleware/validation");

const router = express.Router();

const validators = [
  body("user").notEmpty().isMongoId(),
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("address").notEmpty().isMongoId(),
  body("email").notEmpty().isEmail(),
  body("dateOfBirth").notEmpty().isDate({ format: "MM/DD/YYYY" }),
  body("homeType").notEmpty().isString(),
  body("landlord").notEmpty().isMongoId(),
  body("fosterInfo").notEmpty().isMongoId(),
  body("reference").notEmpty().isMongoId(),
  body("otherInfo").notEmpty().isMongoId(),
  body("agreement").notEmpty().isMongoId(),
  body("status").notEmpty().isString(),
  body("ambassador").notEmpty().isMongoId(),
  body("coordinator").notEmpty().isMongoId(),
  body("completedActionItems").notEmpty().isBoolean(),
  body("selectedDogs").notEmpty().isArray().isString(),
  body("preference").notEmpty().isArray().isString(),
];

/**
 * GET /applications/:applicationId - Return an application profile by ID
 */
router.get("/:applicationId", (req, res, next) => {
  getApplication(req.params.applicationId)
    .then((application) =>
      res.status(200).json({
        application,
      })
    )
    .catch((err) => {
      next(err);
    });
});

/**
 * POST /applications - Create an application profile
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createApplication(req.body)
    .then((application) => {
      res.status(200).json({
        application,
      });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * PUT /applications/:applicationId - Update an application profile
 */
router.put(
  "/:applicationId",
  [...validators.map((validator) => validator.optional()), validateRequest], // all fields for update are optional
  (req, res, next) => {
    updateApplication(req.params.applicationId, req.body)
      .then((application) => {
        if (application) {
          res.status(200).json({
            application,
          });
        } else {
          throw new Error("Application profile was not updated.");
        }
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
