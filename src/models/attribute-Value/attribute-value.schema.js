import z from "zod";

const attributeValueSchema = z.object({
  // value: z.string().min(1, "Giá trị là bắt buộc").trim(),
  // valueCode: z.string().min(1, "Mã giá trị là bắt buộc").trim(),
  // attributeId: z.string().nonempty("Attribute ID is required"),
  // isActive: z.boolean().default(true),
});

export default attributeValueSchema;
