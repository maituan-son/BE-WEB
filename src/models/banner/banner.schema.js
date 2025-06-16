import z from "zod";
export const bannerSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  description: z.string().optional(),
  image: z.string().min(1, "Hình ảnh là bắt buộc"),
  link: z.string().url("Liên kết không hợp lệ").optional(),
  isActive: z.boolean().default(true),
  deletedAt: z.date().nullable().optional(),
});
export const updateBannerSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc").optional(),
  description: z.string().optional(),
  image: z.string().min(1, "Hình ảnh là bắt buộc").optional(),
  link: z.string().url("Liên kết không hợp lệ").optional(),
  isActive: z.boolean().optional(),
  deletedAt: z.date().nullable().optional(),
});
