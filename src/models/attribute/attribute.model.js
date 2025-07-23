import mongoose from "mongoose";
import { de } from "zod/v4/locales";

const attributeSchema = new mongoose.Schema(
  {
    attributeName: {
      type: String,
      required: true,
    },
    attributeCode: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true, // Default to true for active attributes
    },
    deletedAt: {
      type: Date,
      default: null, // Soft delete field
    },
  },
  {
    timestamps: true, // ✅ Tự thêm createdAt & updatedAt
    versionKey: false, // ✅ Không tạo __v
  }
);

const Attribute = mongoose.model("Attribute", attributeSchema);
export default Attribute;
