import { Router } from "express";
import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth.js";
const router = Router();

/**
 * @router GET api/auth/
 * @description Check if a user is logged in
 * @access Public
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal sever error" });
  }
});

/**
 * @router POST api/auth/register
 * @description Register a user
 * @access Public
 */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //simple validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password !",
    });
  }
  try {
    // check for existing username
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Already registered username",
      });
    }
    //All good
    const hashPassword = await argon2.hash(password);
    let newUser = new User({ username, password: hashPassword });
    await newUser.save();
    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User registered successfully!",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: "Internal server error" });
  }
});
/**
 * @router POST api/auth/login
 * @description Login user
 * @access Public
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password !",
    });
  }
  try {
    // check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!" });
    }
    //User found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!" });
    }
    //All good return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ success: true, message: "Login successfully!", accessToken });
  } catch (error) {
    console.error(error);
    res.json(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
