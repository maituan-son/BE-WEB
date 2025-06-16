import z from "zod";
export const subcategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryParentId: z.string().min(1, "Parent category ID is required"),
  logoUrl: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  slug: z.string().min(1, "Slug is required"),
  deletedAt: z.date().nullable().optional(),
});
