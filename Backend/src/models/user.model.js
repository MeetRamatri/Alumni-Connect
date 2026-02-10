import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: ["student", "alumni", "admin"],
      default: "student",
    },

    batch: {
      type: Number,
    },

    cur_role: {
      type: String,
    },

    company: {
      type: String,
    },

    location: {
      type: String,
    },

    profilePic: {
      type: String,
      default: "",
    },

    calendlyLink: {
      type: String,
      default: "",
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
