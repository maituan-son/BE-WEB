import e from "express";
import mongoose from "mongoose";
import { productColors, shoeSizes } from "../enums.js";
const productSchema = new mongoose.Schema(
  {
    title: String,
    thumbnail: String,
    description: String,
    shortDescription: String,
    specifications: Object,
    price: Number,
    oldPrice: Number,
    slug: String,
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    color: {
      type: String,
      enum: productColors,
    },
    size: {
      type: Number,
      enum: shoeSizes,
    },
    stock: Number,
    soldCount: Number,
    seoTitle: String,
    seoDescription: String,
    tags: [String],
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date, default: Date.now },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false, // Disable the __v field
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.model("Product", productSchema);
