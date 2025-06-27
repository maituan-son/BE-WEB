import z from "zod";

export const attributeSchema = z.object({
  attributeName: z.string().min(1, "Attribute tên là bắt buộc").trim(),
  attributeCode: z
    .string()
    .min(1, "Attribute mã là bắt buộc")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Attribute mã phải viết thường và chỉ chứa chữ cái, số và dấu gạch ngang"
    )
    .trim(),
  description: z.string().optional().default(""),
  deletedAt: z.date().nullable().optional(),
});
