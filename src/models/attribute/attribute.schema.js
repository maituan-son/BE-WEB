import z from "zod";

export const attributeSchema = z.object({
  attributeName: z.string().min(1, "Attribute tên là bắt buộc").trim(),
  attributeCode: z
    .string()
    .min(1, "Attribute mã là bắt buộc")

    .trim(),
  description: z.string().optional().default(""),
  deletedAt: z.date().nullable().optional(),
});
