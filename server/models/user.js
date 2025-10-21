import mongoose from "mongoose";

// ==========================
// 👤 User Schema Definition
// ==========================
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength:10,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Don't return password in queries by default
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      type: String, // You can store image URL or filename
      default: "",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// ==========================
// 📦 Export Model
// ==========================
const User = mongoose.model("User", userSchema);
export default User;
