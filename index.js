const express = require("express");

const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

mongoose.connect(config.db.uri);
mongoose.connection.once("open", async () => {
  console.log("Established connection to MongoDB.");
});
app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE"] }));

// Routes
app.use("/api/dogs", require("./routes/dogs"));
app.use("/api/application", require("./routes/application"));
app.use("/api/interviews", require("./routes/interviews"));
app.use("/api/admins", require("./routes/admins"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contact", require("./routes/contact"));

// Error handling
app.use((err, req, res, _) => {
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
