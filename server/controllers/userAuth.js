// controllers/authController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // 🧩 Validate required fields
    if (!name || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password) are required",
      });
    }

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 Set secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error in register controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
