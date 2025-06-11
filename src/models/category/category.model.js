import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
    deleteAt: {
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
