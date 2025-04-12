import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import genTokenAndSetCookie from "../utils/token.util.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await userModel.findOne({
      $or: [{ email }, { password }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with that email or username",
      });
    }

    const newUser = new userModel({
      username,
      email,
      password,
      role
    });
    await newUser.save();
    const token = genTokenAndSetCookie(newUser, res);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(`Error in register: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = genTokenAndSetCookie(user, res);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(`Error in login: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
