const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.monogo_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`Could not connect to db` + err);
  });
