const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const port = 5000;

require("./db");
require("./models/User");

const authRoutes = require("./routes/authRoutes");

app.use(bodyparser.json());
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("This is a home page");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
