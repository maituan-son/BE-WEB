import z from "zod";

const attributeValueSchema = z.object({
  value: z.string().min(2).max(100).trim(),
  attributeId: z.string().uuid(),
});

export default attributeValueSchema;
