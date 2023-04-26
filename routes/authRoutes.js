const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/signup", (req, res) => {
  const { name, email, password, dob } = req.body;
  if (!name || !email || !password || !dob) {
    return res.status(400).send({ error: "All fields are required" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    console.log(savedUser);
    if (savedUser) {
      return res.status(400).send({ error: "User already exist" });
    }
    const user = new User({
      name,
      email,
      password,
      dob,
    });
    try {
      await user.save();
      const token = jwt.sign({ _id: User._id }, process.env.JWT_SECRET);
      res.send({ token });
    } catch (error) {
      console.log(`db err` + error);
      return res.status(422).send({ error: error.message });
    }
  });
});

module.exports = router;
