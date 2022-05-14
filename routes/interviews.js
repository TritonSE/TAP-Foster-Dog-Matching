const express = require("express");
const { body } = require("express-validator");
const { getInterview, createInterview } = require("../services/interviews");
const { validateRequest } = require("../middleware/validation");

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
 * GET /interview/:interviewId - Return an interview by ID
 *
 * @queryParam stage - Current stage of the interview
 */
router.get("/:interviewId", (req, res) => {
  getInterview(req.params.interviewId, req.query.stage)
    .then((interview) => {
      if (interview) {
        return res.status(200).json({ interview });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, interview could not be retrieved` }],
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * POST /interviews - Create an interview
 */
router.post("/", [...validators, validateRequest], (req, res) => {
  createInterview(req.body)
    .then((interview) => {
      if (interview) {
        return res.status(200).json({ interview });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, interview could not be created` }],
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
