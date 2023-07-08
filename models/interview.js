const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

/**
 * Interview Model
 */
module.exports = mongoose.model(
  "Interview",
  new Schema({
    user: {
      type: ObjectId,
      required: true,
    },
    ambassador: {
      type: ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // i don't think this is used
    internalNotes: {
      type: String,
    },
    stage: {
      type: String,
      required: true,
    },
  })
);
