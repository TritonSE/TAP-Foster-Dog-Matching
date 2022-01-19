const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * Dog Profile Model
 */
module.exports = mongoose.model(
  "Dog",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: [String],
      required: true,
    },
    backgroundInfo: {
      type: String,
      required: true,
    },
    vettingInfo: {
      type: String,
      required: true,
    },
    internalNotes: {
      type: String,
    },
  })
);
