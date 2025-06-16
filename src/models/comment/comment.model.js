import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true, // Ensure productId is provided
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure userId is provided
    },
    content: {
      type: String,
      required: true, // Ensure content is provided
      trim: true, // Remove leading and trailing whitespace
    },
    rating: {
      type: Number,
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
      required: true, // Ensure rating is provided
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to current date and time
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Default to current date and time
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
);
export default mongoose.model("Comment", commentSchema);
