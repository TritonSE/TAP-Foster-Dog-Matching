const express = require("express");
const { body } = require("express-validator");
const {
  getApplication,
  getApplications,
  createApplication,
  updateApplication,
} = require("../services/application");
const { validateRequest } = require("../middleware/validation");
const { requireAuthenticatedAdmin } = require("../middleware/auth");

const router = express.Router();

const validators = [
  body("user").notEmpty().isMongoId(),
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("address").notEmpty(),
  body("address.addressOne").notEmpty().isString(),
  body("address.addressTwo").notEmpty().isString().optional(),
  body("address.city").notEmpty().isString(),
  body("address.state").notEmpty().isString(),
  body("address.country").notEmpty().isString(),
  body("address.zipcode").notEmpty().isNumeric().isLength({ min: 5, max: 5 }),
  body("email").notEmpty().isString().isEmail(),
  body("dateOfBirth").notEmpty().isDate({ format: "MM-DD-YYYY" }),
  body("homeType").notEmpty().isString(),
  body("landlord").notEmpty(),
  body("landlord.firstName").notEmpty().isString(),
  body("landlord.lastName")
    .if(
      body("landlord.firstName")
        .isString()
        .custom((input) => input !== "n/a")
    )
    .notEmpty()
    .isString(),
  body("landlord.phone")
    .if(
      body("landlord.firstName")
        .isString()
        .custom((input) => input !== "n/a")
    )
    .notEmpty()
    .isString()
    .isMobilePhone("en-US"),
  body("landlord.email")
    .if(
      body("landlord.firstName")
        .isString()
        .custom((input) => input !== "n/a")
    )
    .notEmpty()
    .isString()
    .isEmail(),
  body("fosterInfo").notEmpty(),
  body("fosterInfo.restrictions").notEmpty().isString(),
  body("fosterInfo.sleepLocation").notEmpty().isString(),
  body("fosterInfo.hoursAtHome").notEmpty().isString(),
  body("fosterInfo.typicalDay").notEmpty().isString(),
  body("fosterInfo.primaryCaregiver").notEmpty().isString(),
  body("fosterInfo.othersOnboard").notEmpty().isString(),
  body("fosterInfo.permissionToVisit").notEmpty().isBoolean(),
  body("fosterInfo.pastExperience").notEmpty().isString(),
  body("fosterInfo.whyFoster").notEmpty().isString(),
  body("fosterInfo.oneMonthCommitment").notEmpty().isString(),
  body("fosterInfo.sizeOfDog")
    .notEmpty()
    .isArray()
    .custom((input) => input.every((value) => typeof value === "string")),
  body("fosterInfo.ageOfDog")
    .notEmpty()
    .isArray()
    .custom((input) => input.every((value) => typeof value === "string")),
  body("reference").notEmpty(),
  body("reference.firstName").notEmpty().isString(),
  body("reference.lastName").notEmpty().isString(),
  body("reference.phone").notEmpty().isString().isMobilePhone("en-US"),
  body("reference.email").notEmpty().isString().isEmail(),
  body("reference.relation").notEmpty().isString(),
  body("reference.yearsKnown").notEmpty().isNumeric(),
  body("otherInfo").notEmpty(),
  body("otherInfo.howDidYouHearAboutTAP").notEmpty().isString(),
  body("otherInfo.otherPets").notEmpty().isString(),
  body("otherInfo.dogsHealth").notEmpty().isString(),
  body("otherInfo.dogsNeutered").notEmpty().isBoolean(),
  body("otherInfo.children").notEmpty().isString(),
  body("otherInfo.livingSituation").notEmpty().isString(),
  body("agreement").notEmpty(),
  body("agreement.name").notEmpty().isString(),
  body("agreement.date").notEmpty().isDate({ format: "MM-DD-YYYY" }),
  body("agreement.signature").notEmpty().isString(),
  body("status").notEmpty().isString(),
  body("ambassador").optional().isMongoId(),
  body("coordinator").optional().isMongoId(),
  body("completedActionItems").notEmpty().isBoolean(),
  body("selectedDogs")
    .optional()
    .isArray()
    .custom((input) => input.every((value) => typeof value === "string")),
  body("preference")
    .optional()
    .isArray()
    .custom((input) => input.every((value) => typeof value === "string")),
  body("finalDog").optional().isString(),
];

/**
 * GET /pending - Return all pending applications depending on role
 *  - Management gets all pending applications
 *  - Other admins gets only pending applications assigned to them
 */
router.get("/pending", [requireAuthenticatedAdmin], (req, res, next) => {
  const options = { pending: true };
  const adminRole = req.currentUser.role;
  if (adminRole !== "management") {
    options.ambassador = req.currentUser._id;
  }
  getApplications(options)
    .then((applications) => {
      res.status(200).json({
        applications,
      });
    })
    .catch((err) => next(err));
});

router.get("/all", [requireAuthenticatedAdmin], (req, res, next) => {
  const options = { pending: false };
  const adminRole = req.currentUser.role;
  if (adminRole !== "management") {
    options.ambassador = req.currentUser._id;
  }
  getApplications(options)
    .then((applications) => {
      res.status(200).json({
        applications,
      });
    })
    .catch((err) => next(err));
});

/**
 * GET /applications/:applicationId - Return an application by ID
 */
router.get("/:applicationId", (req, res, next) => {
  getApplication(req.params.applicationId)
    .then((application) => {
      if (application) {
        return res.status(200).json({
          application,
        });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, application could not be found` }],
      });
    })
    .catch((err) => next(err));
});

/**
 * POST /application - Create an application
 */

router.post("/", [...validators, validateRequest], (req, res, next) => {
  createApplication(req.body)
    .then((application) => {
      if (application) {
        return res.status(200).json({
          application,
        });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, new application could not be created` }],
      });
    })
    .catch((err) => next(err));
});

/**
 * PUT /application/:applicationId - Update an application
 */
router.put(
  "/:applicationId",
  [...validators.map((validator) => validator.optional()), validateRequest], // all fields for update are optional
  (req, res, next) => {
    updateApplication(req.params.applicationId, req.body)
      .then((application) => {
        if (application) {
          return res.status(200).json({
            application,
          });
        }
        return res.status(400).json({
          errors: [{ message: `Something went wrong, application could not be updated` }],
        });
      })
      .catch((err) => next(err));
  }
);

module.exports = router;
