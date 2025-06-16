import z from "zod";

export const brandSchema = z.object({
  title: z.string().min(1, "Tên thương hiệu là bắt buộc"),
  logoUrl: z.string().url("URL logo không hợp lệ").optional(),
  description: z.string().optional(),
  slug: z.string().min(1, "Slug là bắt buộc").max(100, "Slug quá dài"),
  deletedAt: z.date().nullable().optional(),
});
