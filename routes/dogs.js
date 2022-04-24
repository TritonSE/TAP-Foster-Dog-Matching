const express = require("express");
const { body } = require("express-validator");
const { getDogs, getDog, createDog, updateDog } = require("../services/dogs");
const { validateRequest } = require("../middleware/validation");

const router = express.Router();

const validators = [
  body("name").notEmpty().isString(),
  body("age").notEmpty().isInt(),
  body("gender").notEmpty().isString(),
  body("weight").notEmpty().isNumeric(),
  body("breed").notEmpty().isString(),
  body("imageUrl").notEmpty().isArray().isURL(),
  body("backgroundInfo").notEmpty().isString(),
  body("vettingInfo").notEmpty().isString(),
  body("internalNotes").optional().isString(),
];

/**
 * GET /dogs - Return all dog profiles
 */
router.get("/", (req, res, next) => {
  getDogs()
    .then((dogs) => {
      if (dogs) {
        return res.status(200).json({
          dogs,
        });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, dog profiles could not be retrieved` }],
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * GET /dogs/:dogId - Return a dog profile by ID
 */
router.get("/:dogId", (req, res, next) => {
  getDog(req.params.dogId)
    .then((dog) => {
      if (dog) {
        return res.status(200).json({
          dog,
        });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, dog profile could not be retrieved` }],
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * POST /dogs - Create a dog profile
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createDog(req.body)
    .then((dog) => {
      if (dog) {
        return res.status(200).json({
          dog,
        });
      }
      return res.status(400).json({
        errors: [{ message: `Something went wrong, new dog profile could not be created` }],
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * PUT /dogs/:dogId - Update a dog profile
 */
router.put(
  "/:dogId",
  [...validators.map((validator) => validator.optional()), validateRequest], // all fields for update are optional
  (req, res, next) => {
    updateDog(req.params.dogId, req.body)
      .then((dog) => {
        if (dog) {
          return res.status(200).json({
            dog,
          });
        }
        return res.status(400).json({
          errors: [{ message: `Something went wrong, dog profile could not be updated` }],
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }
);

module.exports = router;
