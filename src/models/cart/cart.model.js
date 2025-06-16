import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the update date
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
);

export default mongoose.model("Cart", cartSchema);
