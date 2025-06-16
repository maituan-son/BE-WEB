import mongoose from "mongoose";
import { userRoles } from "../enums.js";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: [String], // Array of strings for addresses
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.MEMBER,
    },
    phone_number: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    latestLogin: {
      type: Date,
      default: null,
    },
    isVerifyEmail: {
      type: Boolean,
      default: false,
    },
    isVerifyPhoneNumber: {
      type: Boolean,
      default: false,
    },
    is2StepVerify: {
      type: Boolean,
      default: false,
    },
    deletedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    updatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
