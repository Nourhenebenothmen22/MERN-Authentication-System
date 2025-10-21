// ==============================================
// 📦 Express Server Setup with MongoDB & Security
// ==============================================

import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// ==============================================
// 🧰 Load environment variables
// ==============================================
dotenv.config();

// ==============================================
// 🔌 Connect to MongoDB
// ==============================================
connectDB();

// ==============================================
// 🚀 Initialize Express app
// ==============================================
const app = express();
const PORT = process.env.PORT || 5000;

// ==============================================
// 🧱 Security Middlewares
// ==============================================

// Helmet helps secure HTTP headers to prevent well-known web vulnerabilities
app.use(helmet());

// Enable CORS to allow requests from different origins (frontend/backend)
app.use(cors({
  origin: process.env.CLIENT_URL || "*", // Adjust based on your frontend domain
  credentials: true,
}));

// Cookie parser to handle cookies (useful for authentication, sessions, etc.)
app.use(cookieParser());

// ==============================================
// 🧾 Logging Middleware
// ==============================================
// Morgan logs incoming HTTP requests in the console
app.use(morgan("dev"));

// ==============================================
// 📦 Body Parser
// ==============================================
// Allows Express to read and parse JSON request bodies
app.use(express.json());

// ==============================================
// 🚦 Rate Limiting Middleware
// ==============================================
// Prevents abuse or brute-force attacks by limiting repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per window
  message: "🚫 Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in standard headers
  legacyHeaders: false,  // Disable the deprecated X-RateLimit-* headers
});

// Apply rate limiter globally to all routes
app.use(limiter);

// ==============================================
// 🧩 Example Route
// ==============================================
app.get("/", (req, res) => {
  res.json({ message: "Express server with MongoDB and rate limit is running ✅" });
});

// ==============================================
// 🖥️ Start the Server
// ==============================================
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
