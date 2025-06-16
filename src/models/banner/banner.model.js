import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      default: 0, // Default order value
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null, // Allows for no associated product
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
);

export default mongoose.model("Banner", bannerSchema);
