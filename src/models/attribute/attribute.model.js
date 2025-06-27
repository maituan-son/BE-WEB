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
    deletedAt: {
      type: Date,
      default: null, // Soft delete field
    },
  },
  {
    timeseries: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
);

const Attribute = mongoose.model("Attribute", attributeSchema);
export default Attribute;
