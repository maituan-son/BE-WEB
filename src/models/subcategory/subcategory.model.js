import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    categoryParentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
subCategorySchema.index({ categoryParentId: 1 });
subCategorySchema.index({ deletedAt: 1 });
subCategorySchema.index({ slug: 1 });

export default mongoose.model("Subcategory", subCategorySchema);
