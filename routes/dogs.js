const express = require("express");
const multer = require("multer");
const { nanoid } = require("nanoid");
const { body } = require("express-validator");
const { getDogs, getDog, createDog, updateDog } = require("../services/dogs");
const { validateRequest } = require("../middleware/validation");
const { requireAuthentication, requireAuthenticatedAdmin } = require("../middleware/auth");
const { uploadImage } = require("../services/image");

const router = express.Router();
const upload = multer();

const validators = [
  body("name").notEmpty().isString(),
  body("age").notEmpty().isInt(),
  body("gender").notEmpty().isString(),
  body("weight").notEmpty().isNumeric(),
  body("breed").notEmpty().isString(),
  body("category").notEmpty().isIn(["new", "in home", "adopted"]),
  body("backgroundInfo").notEmpty().isString(),
  body("vettingInfo").notEmpty().isString(),
  body("internalNotes").optional().isString(),
];

/**
 * GET /dogs - Return all dog profiles
 */
router.get("/", [requireAuthenticatedAdmin], (req, res, next) => {
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
    .catch((err) => next(err));
});

/**
 * GET /dogs/:dogId - Return a dog profile by ID
 */
router.get("/:dogId", [requireAuthentication], (req, res, next) => {
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
    .catch((err) => next(err));
});

/**
 * POST /dogs - Create a dog profile
 */
router.post("/", [...validators, validateRequest, requireAuthenticatedAdmin], (req, res, next) => {
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
    .catch((err) => next(err));
});

/**
 * PUT /dogs/:dogId - Update a dog profile
 */
router.put(
  "/:dogId",
  [
    ...validators.map((validator) => validator.optional()), // all fields for update are optional
    validateRequest,
    requireAuthenticatedAdmin,
  ],
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
      .catch((err) => next(err));
  }
);

/**
 * PUT /dogs/photo/:dogId - Update a dog profile image
 */
router.put(
  "/photo/:dogId",
  [requireAuthenticatedAdmin, upload.single("image")],
  (req, res, next) => {
    const { dogId } = req.params;
    uploadImage(`dog/${dogId}_${nanoid(6)}.jpg`, req.file)
      .then((imageUrl) => updateDog(dogId, { imageUrl }))
      .then((dog) =>
        res.status(200).json({
          dog,
        })
      )
      .catch((err) => next(err));
  }
);

module.exports = router;
