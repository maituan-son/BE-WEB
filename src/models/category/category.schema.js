import z from "zod";
export const categorySchema = z.object({
  title: z.string().min(1, "Tên danh mục là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc").unique(),
  deleteAt: z.date().nullable().optional(),
});
export const updateCategorySchema = z.object({
  title: z.string().min(1, "Tên danh mục là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc").unique(),
  deleteAt: z.date().nullable().optional(),
});
