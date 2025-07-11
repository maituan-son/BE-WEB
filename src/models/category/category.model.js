import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    logoUrl: {
      type: String,
      default: "", // Default value for logoUrl
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    deletedAt: {
      type: Date,
      default: null, // Allows for soft deletion
    },
  },
  {
    versionKey: false, // Disable the __v field
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
export default mongoose.model("Category", categorySchema);
