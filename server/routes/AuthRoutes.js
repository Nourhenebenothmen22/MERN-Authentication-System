import express from "express";
import { register, login, logout } from "../controllers/userAuth.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and clear authentication cookie
 * @access  Private
 */
router.post("/logout", logout);

export default router;
