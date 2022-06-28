const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * Admin Model
 */
module.exports = mongoose.model(
  "Admin",
  new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      required: true,
    },
    schedule: {
      type: Object,
      required: true,
    },
  })
);
