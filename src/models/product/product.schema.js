import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  oldPrice: z.number().min(0, "Old price must be a positive number").optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and can only contain letters, numbers, and hyphens"
    ),
  brand: z.string().min(1, "Brand ID is required"),
  subCategory: z.string().min(1, "SubCategory ID is required"),
  color: z.enum(["red", "blue", "green", "black", "white"]).optional(),
  size: z
    .enum(["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"])
    .optional(),
  stock: z.number().min(0, "Stock must be a non-negative number").optional(),
  soldCount: z
    .number()
    .min(0, "Sold count must be a non-negative number")
    .optional(),
  seoTitle: z.string().min(1, "SEO title is required").optional(),
  seoDescription: z.string().min(1, "SEO description is required").optional(),
  tags: z.array(z.string()).optional(),
  deletedAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedBy: z.string().optional(),
  updatedBy: z.string().optional(),
});
