import e from "express";
import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: [String],
      enum: ["nike", "adidas", "puma", "reebok", "etc."],
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    sizes: {
      type: [Number],
      enum: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      default: [],
      required: true,
    },
    colors: {
      type: [String],
      enum: [
        "red",
        "blue",
        "green",
        "black",
        "white",
        "yellow",
        "pink",
        "purple",
      ],
      default: [],
      required: true,
    },
    image: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
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

export default mongoose.model("Product", productSchema);
