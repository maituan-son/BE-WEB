import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: String,
    thumbnail: String,
    images: {
      type: [String], // Danh sách URL ảnh
    },
    description: String,
    shortDescription: String,
    specifications: String,
    priceDefault: Number,
    discountPercentage: Number,
    slug: String,
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    soldCount: { type: Number, default: 0 },
    averageRating: Number,
    ratingCount: Number,
    seoTitle: String,
    seoDescription: String,
    tags: { type: [String], default: [] },
    variants: {
      type: [
        {
          attributeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attribute",
            required: true,
          },
          valueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AttributeValue",
            required: true,
          },
          stock: {
            type: Number,
            required: true,
            default: 0,
          },
          price: {
            type: Number,
            required: true,
          },
          oldPrice: {
            type: Number,
            required: false,
            default: 0,
          },
          sku: {
            type: String,
            required: true,
            unique: true,
          },
        },
      ],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true, // Trạng thái hiển thị
    },

    stockTotal: {
      type: Number,
      default: 0, // Tổng tồn kho
    },
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
