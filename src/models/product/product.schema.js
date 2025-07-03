import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().optional(),
  specifications: z.string().optional(),
  priceDefault: z.number().min(0, "Price must be a positive number"),
  discountPercentage: z
    .number()
    .min(0, "Discount percentage must be non-negative")
    .max(100, "Discount percentage cannot exceed 100"),
  slug: z.string().min(1, "Slug is required"),
  brandId: z.string().optional(), // Assuming brandId is a string (ObjectId)
  subCategoryId: z.string().optional(), // Assuming subCategoryId is a string (ObjectId)
  soldCount: z.number().default(0),
  averageRating: z.number().min(0).max(5).optional(),
  ratingCount: z.number().default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).default([]),
  variants: z.array(z.object({})).default([]), // Assuming variants are objects
  isActive: z.boolean().default(true),
  stockTotal: z.number().default(0),
  deletedAt: z.date().nullable().optional(),
  updatedAt: z.date().default(() => new Date()),
  deletedBy: z.string().optional(), // Assuming deletedBy is a string (ObjectId)
  updatedBy: z.string().optional(), // Assuming updatedBy is a string (ObjectId
});
