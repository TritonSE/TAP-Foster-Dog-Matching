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
        res.status(200).json({
          dogs,
        });
      } else {
        res.status(400).json({
          message: `Something went wrong, new dogs could not be retrieved`,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("server error, dogs could not be retrieved");
    });
});

/**
 * GET /dogs/:dogId - Return a dog profile by ID
 */
router.get("/:dogId", (req, res, next) => {
  getDog(req.params.dogId)
    .then((dog) => {
      if (dog) {
        res.status(200).json({
          dog,
        });
      }
      res.status(400).json({
        message: `Something went wrong, new dogs could not be retrieved`,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("server error, dogs could not be retrieved");
    });
});

/**
 * POST /dogs - Create a dog profile
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createDog(req.body)
    .then((dog) => {
      if (dog) {
        res.status(200).json({
          dog,
        });
      }
      res.status(400).json({
        message: `Something went wrong, new dogs could not be created`,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("server error, dogs could not be retrieved");
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
          res.status(200).json({
            dog,
          });
        } else {
          res.status(400).json({
            message: `Something went wrong, new dogs could not be updated`,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("server error, dogs could not be retrieved");
      });
  }
);

module.exports = router;
