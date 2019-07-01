const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const coinRoutes = require("./routes/routes");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

mongoose.connect(
  "mongodb://admin:332646Aa@ds157276.mlab.com:57276/mern-auth",
  { useNewUrlParser: true, useCreateIndex: true },
  (err, client) => {
    if (err) return console.log(err);
    app.listen(port, () => {
      console.log(`server is running on the port ${port}`);
    });
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use("/api", coinRoutes);
