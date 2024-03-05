const express = require("express");
const { User } = require("../models/userModel");
const router = express.Router();
const { z } = require("zod");
const { generateToken } = require("../config/generatetoken");

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8, "password lessthan 8 characteers"),
});

router.post("/signup", async (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const { success, data } = userSchema.safeParse(req.body);

    if (!success) {
      return res.json({ message: "Validation Failed" });
    }

    const userExists = await User.findOne({ username: data.username });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      username: data.username,
      password: data.password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Failed to create the user" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const { success, data } = userSchema.safeParse(req.body);

    console.log(data, success);

    if (!success) {
      return res.json({ message: "Validation Failed" });
    }

    const user = await User.findOne({ username: data.username });
    
    if (
      user &&
      data.username === user.username &&
      data.password === user.password
    ) {
      res.status(200).json({
        _id: user._id,
        name: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).json({
        message: "User not found or password may be wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
