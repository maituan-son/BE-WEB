import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountPercent: {
      type: Number,
      default: 0, // Default value for discountPercent
    },
    maxDiscount: {
      type: Number,
      default: 0, // Default value for maxDiscount
    },
    startDate: {
      type: Date,
      default: null, // Allows for no start date
    },

    endDate: {
      type: Date,
      default: null, // Allows for no end date
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Minimum quantity of 1
    },
    isActive: {
      type: Boolean,
      default: true, // Default value for isActive
    },
  },
  {
    versionKey: false, // Disable the __v field
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
