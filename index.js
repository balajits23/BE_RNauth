const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");

const port = 9000;

require("./db");
require("./models/User");

const authRoutes = require("./routes/authRoutes");
const requireToken = require("./middlewares/requireToken");

app.use(cors());
app.use(bodyparser.json());
app.use(authRoutes);

app.get("/", requireToken, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
