const express = require("express");

const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.db.uri);
mongoose.connection.once("open", async () => {
  console.log("Established connection to MongoDB.");
});

// Routes
app.use("/api/dogs", require("./routes/dogs"));
app.use("/api/interviews", require("./routes/interviews"));
app.use("/api/admins", require("./routes/admins"));
app.use("/api/users", require("./routes/users"));

// Error handling
app.use((err, req, res) => {
  if (err.status === 500 || err.status == null) {
    console.error(err);
    res.status(500).json({
      message: `Something went wrong on the server: ${err.message}`,
    });
  } else {
    res.status(err.status).json({
      message: err.message,
    });
  }
});

app.listen(config.app.port, () => {
  console.log(`Server listening at http://localhost:${config.app.port}`);
});
