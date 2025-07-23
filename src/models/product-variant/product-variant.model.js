import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    attributesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
        required: true,
      },
    ],
    attributeValuesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AttributeValue",
        required: true,
      },
    ],
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    sku: {
      type: String,
      required: true,
      unique: true, // Ensure SKU is unique
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;
