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
    applications: {
      type: [ObjectId],
      required: true,
    },
    lastActive: {
      type: Date,
      required: true,
    },
    currentlyFostering: {
      type: Boolean,
      required: true,
    },
    fosters: {
      past: {
        type: [ObjectId],
        required: true,
      },
      current: {
        type: [ObjectId],
        required: true,
      },
    },
    ambassador: {
      type: ObjectId,
    },
    coordinator: {
      type: ObjectId,
    },
    accountStatus: {
      type: String,
      required: true,
    },
  })
);
