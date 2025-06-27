import z from "zod";

export const productVariantSchema = z.object({
  productId: z.string().nonempty("Product ID is required"),
  attributeValues: z
    .array(z.string())
    .nonempty("Attribute values are required"),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  price: z.number().positive("Price must be a positive number"),
  oldPrice: z.number().optional(),
  specifications: z.record(z.any()).optional(),
  soldCount: z
    .number()
    .int()
    .min(0, "Sold count must be a non-negative integer")
    .optional(),
  deletedAt: z.date().optional(),
  thumbnail: z
    .string()
    .url("Thumbnail must be a valid URL")
    .nonempty("Thumbnail is required"),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
});
