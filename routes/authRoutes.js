const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

router.post("/signup", (req, res) => {
  const { name, email, password, dob } = req.body;
  if (!name || !email || !password || !dob) {
    return res.status(400).send({ error: "All fields are required" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(402).send({ error: "User already exist" });
    }
    const user = new User({
      name,
      email,
      password,
      dob,
    });
    try {
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.send({ token, message: "User registered successfully" });
    } catch (error) {
      return res.status(422).send({ error: error.message });
    }
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({ error: "Please add all the fields" });
  }

  const savedUser = await User.findOne({ email: email });

  if (!savedUser) {
    return res.status(401).send({ error: "Invalid emailId" });
  }

  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.send({ token });
      } else {
        return res.status(401).send({ error: "Invalid Email or Password" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
