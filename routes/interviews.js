const express = require("express");
const { body } = require("express-validator");
const { getInterview, createInterview } = require("../services/interviews");
const { validateRequest } = require("../middleware/validation");

const router = express.Router();

const validators = [
  body("user").notEmpty().isMongoId(),
  body("ambassador").notEmpty().isMongoId(),
  body("email").notEmpty().isEmail(),
  body("phone").notEmpty().isMobilePhone("en-US"),
  body("date").notEmpty().isDate({ format: "MM/DD/YYYY" }),
  body("time").notEmpty().matches("^([0-1][0-9]|2[0-3]):([0-5][0-9])$"),
  body("location").notEmpty().isString(),
  body("internalNotes").notEmpty().isString(),
  body("stage").notEmpty().isString(),
];

/**
 * GET /interview/:interviewId - Return an interview by ID
 *
 * @queryParam stage - Current stage of the interview
 */
router.get("/:interviewId", (req, res, next) => {
  getInterview(req.params.interviewId, req.query.stage)
    .then((interview) => {
      if (!interview) throw new Error("Interview does not exist!");
      res.status(200).json({ interview });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * POST /interviews - Create an interview
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createInterview(req.body)
    .then((interview) => {
      res.status(200).json({ interview });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
