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
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      required: false,
    },
    schedule: {
      type: Object,
      required: false,
    },
  })
);
