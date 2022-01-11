const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", async () => {
    console.log("Established connection to MongoDB.");
  });