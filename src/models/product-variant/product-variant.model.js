import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		attributeValues: [
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
		specifications: {
			type: Object,
		},
		soldCount: {
			type: Number,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			default: [],
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;