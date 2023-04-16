const express = require("express");
const { body } = require("express-validator");
const {
  getInterview,
  getInterviews,
  createInterview,
  updateInterview,
} = require("../services/interviews");
const { validateRequest } = require("../middleware/validation");
const {
  requireAuthenticatedUser,
  requireAuthenticatedUserOrAdminRoles,
} = require("../middleware/auth");
const { ADMIN_ROLES } = require("../services/admins");

const router = express.Router();

// TODO: Add verification to check if user and ambassador ids exist once
// 	 their models are implemented
const validators = [
  body("user").notEmpty().isMongoId(),
  body("ambassador").notEmpty().isMongoId(),
  body("date").notEmpty().isDate({ format: "MM/DD/YYYY" }),
  body("time")
    .notEmpty()
    .matches("^((1[0-2]|0?[1-9]):([0-5][0-9]) - (1[0-2]|0?[1-9]):([0-5][0-9])([AaPp][Mm]))$"),
  body("location").notEmpty().isString(),
  body("internalNotes").optional().isString(),
  body("stage").notEmpty().isString(),
];

/**
 * GET /interviews/:userId - Return an interview for userId
 *
 * @queryParam stage - stage of the interview to query for
 */
router.get(
  "/:userId",
  [requireAuthenticatedUserOrAdminRoles(ADMIN_ROLES.MANAGEMENT, ADMIN_ROLES.AMBASSADOR)],
  (req, res, next) => {
    getInterview(req.params.userId, req.query.stage)
      .then((interview) => res.status(200).json({ interview }))
      .catch((err) => next(err));
  }
);

/**
 * GET /interviews - Return interviews by date query
 */
router.get("/", (req, res) => {
  getInterviews(req.query.date)
    .then((interviews) => {
      if (interviews) {
        return res.status(200).json({ interviews });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, interviews could not be retrieved` }],
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * POST /interviews - Create an interview
 */
router.post("/", [...validators, validateRequest, requireAuthenticatedUser], (req, res, next) => {
  createInterview(req.body)
    .then((interview) => {
      if (interview) {
        return res.status(200).json({ interview });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, interview could not be created` }],
      });
    })
    .catch((err) => next(err));
});

/**
 * PUT /interviews/:interviewId - Update an interview
 */
router.put(
  "/:interviewId",
  [...validators.map((validator) => validator.optional()), validateRequest], // all fields for update are optional
  (req, res, next) => {
    updateInterview(req.params.interviewId, req.body)
      .then((interview) => {
        if (interview) {
          return res.status(200).json({
            interview,
          });
        }
        return res.status(400).json({
          errors: [{ message: `Something went wrong, interview could not be updated` }],
        });
      })
      .catch((err) => next(err));
  }
);

module.exports = router;
