import mongoose from "mongoose";
import { userRoles } from "../enums.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
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
    password: {
      type: String,
      required: true, // ✅ THÊM TRƯỜNG PASSWORD
    },
    avatar: {
      type: String,
      default:
        "https://inkythuatso.com/uploads/thumbnails/800/2023/03/10-anh-dai-dien-trang-inkythuatso-03-15-27-10.jpg", // Default avatar URL
    },
    address: {
      type: [String],
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
