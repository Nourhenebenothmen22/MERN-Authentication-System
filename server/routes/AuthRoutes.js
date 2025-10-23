import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  checkAuth,
  sendResetOtp,
  resetPassword
} from "../controllers/userAuth.js";
import userAuth from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/**
 * ============================
 * 🔐 AUTH ROUTES
 * ============================
 */

// 📝 Register a new user
router.post("/register", register);

// 🔑 Login user
router.post("/login", login);

// 🚪 Logout user
router.post("/logout", logout);

// 📩 Send email verification OTP
router.post("/send-verify-otp", userAuth, sendVerifyOtp);

// ✅ Verify user email
router.post("/verify-account", userAuth, verifyEmail);

// 🔍 Check if user is authenticated
router.get("/check-auth", userAuth, checkAuth);

// 🔄 Send password reset OTP
router.post("/send-reset-otp", sendResetOtp);

// 🔄 Send password reset OTP to user's email
router.post("/send-reset-password",resetPassword);

export default router;
