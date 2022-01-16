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
  body("imageUrl").notEmpty().isURL(),
  body("backgroundInfo").notEmpty().isString(),
  body("vettingInfo").notEmpty().isString(),
  body("internalNotes").notEmpty().isString(),
];

/**
 * GET /dogs - Return all dog profiles
 */
router.get("/", (req, res, next) => {
  getDogs()
    .then((dogs) =>
      res.status(200).json({
        dogs,
      })
    )
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /dogs/:dogId - Return a dog profile by ID
 */
router.get("/:dogId", (req, res, next) => {
  getDog(req.params.dogId)
    .then((dog) =>
      res.status(200).json({
        dog,
      })
    )
    .catch((err) => {
      next(err);
    });
});

/**
 * POST /dogs - Create a dog profile
 */
router.post("/", [...validators, validateRequest], (req, res, next) => {
  createDog(req.body)
    .then((dog) => {
      res.status(200).json({
        dog,
      });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * PUT /dogs/:dogId - Update a dog profile
 */
router.put("/:dogId", [...validators, validateRequest], (req, res, next) => {
  updateDog(req.params.dogId, req.body)
    .then((dog) => {
      if (dog) {
        res.status(200).json({
          dog,
        });
      } else {
        throw new Error("Dog profile was not updated.");
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
