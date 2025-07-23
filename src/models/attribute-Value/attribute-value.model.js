import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    valueCode: {
      type: String,
      unique: true, // Ensure valueCode is unique
    },
    attributeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Default to true for active attribute values
    },
    deletedAt: {
      type: Date,
      default: null, // Soft delete field
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set updatedAt to current date
    },
  },
  {
    timestamps: true, // ✅ Tự thêm createdAt & updatedAt
    versionKey: false, // ✅ Không tạo __v
  }
);
const AttributeValue = mongoose.model("AttributeValue", attributeValueSchema);
export default AttributeValue;
