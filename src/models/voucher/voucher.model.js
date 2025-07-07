import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;
