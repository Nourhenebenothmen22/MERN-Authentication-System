// controllers/authController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../utils/mailer.js";

/**
 * @desc Register a new user and send a welcome email
 * @route POST /api/auth/register
 * @access Public
 */
export const register = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

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
      role: ["user", "admin"].includes(role) ? role : "user", // default to "user" if invalid
    });
    await newUser.save();

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✉️ Send welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "🚀 Welcome to NourheneDevHub 🌟",
      text: `Hello ${name}! 👋

Your account has been successfully created at NourheneDevHub — the place where dev dreams come alive! 💻✨
Your registered email is: ${email}

Get ready to code, create, and conquer! 🚀

Cheers,
The NourheneDevHub Team 💡`,
    };
    await transporter.sendMail(mailOptions);

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


/**
 * @desc Login an existing user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🧩 Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (email and password) are required",
      });
    }

    // 🔍 Check if user exists
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Send success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error in login controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
/**
 * @desc Logout user and clear authentication cookie
 * @route POST /api/auth/logout
 * @access Private (optional)
 */
export const logout = async (req, res) => {
  try {
    // 🍪 Clear the authentication cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    // ✅ Send success response
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("❌ Error in logout controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const sendVerifyOtp = async (req, res) => {
  try {
    const { id } = req.body; // ✅ destructuring
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ if already verified
    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // ✅ generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // ✅ assign OTP and expiration date
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24h
    await user.save();

    // ✅ prepare the email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "🚀 Verify your NourheneDevHub account",
      text: `Hello ${user.name || "developer"} 👋,

Here is your verification code for NourheneDevHub: ${otp}

This code will expire in 24 hours ⏰.

If you didn’t request this, please ignore this email.

Cheers,
The NourheneDevHub Team 💡`,
    };

    // ✅ send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Verification OTP sent successfully to your email!",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      message: "Server error while sending OTP",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { id, otp } = req.body;

    // Check request parameters
    if (!id || !otp) {
      return res.status(400).json({ message: "Missing details" });
    }

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP
    if (user.verifyOtp !== otp || !user.verifyOtp.trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check OTP expiration
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // All good, verify the account
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
