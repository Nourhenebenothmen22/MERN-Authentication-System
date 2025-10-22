import mongoose from "mongoose";

// ============================================
// 👤 User Schema — with full validation & docs
// ============================================

/**
 * This schema defines the structure of user documents
 * stored in MongoDB. It includes authentication fields,
 * email verification, password reset tokens, and security settings.
 */

const userSchema = new mongoose.Schema(
  {
    // 🧾 Basic Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [30, "Name must not exceed 30 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address (e.g. user@example.com)",
      ],
    },

    // 🔐 Security & Authentication
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude from queries by default for security
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },

    // ✅ Email Verification Fields
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpireAt: {
      type: Number, // store timestamp (ms)
      default: 0,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    // 🔁 Password Reset Fields
    resetOtp: {
      type: String,
      default: "",
      select: false,
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0,
      select: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);



// ============================================
// 📦 Export Mongoose Model
// ============================================
const User = mongoose.model("User", userSchema);
export default User;
