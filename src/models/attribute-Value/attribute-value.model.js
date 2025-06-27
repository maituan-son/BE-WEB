import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    attributeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
);
const AttributeValue = mongoose.model("AttributeValue", attributeValueSchema);
export default AttributeValue;
