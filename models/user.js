const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

/**
 * User Model
 */
module.exports = mongoose.model(
  "User",
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
    lastActive: {
      type: Date,
      required: true,
    },
    currentlyFostering: {
      type: Boolean,
      required: true,
    },
    pastFosters: {
      type: Number,
      required: true,
    },
    ambassador: {
      type: ObjectId,
      required: true,
    },
    coordinator: {
      type: ObjectId,
      required: true,
    },
    accountStatus: {
      type: String,
      required: true,
    },
  })
);
