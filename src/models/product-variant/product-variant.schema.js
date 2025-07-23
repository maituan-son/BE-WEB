import z from "zod";

export const productVariantSchema = z.object({
  attributesId: z
    .array(z.string().min(1, "attributesId is required"))
    .nonempty("attributesId cannot be empty"),
  attributeValuesId: z
    .array(z.string().min(1, "attributeValuesId is required"))
    .nonempty("attributeValuesId cannot be empty"),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  price: z.number().positive("Price must be a positive number"),
  oldPrice: z.number().optional(),
  sku: z.string().min(1, "SKU is required"),
  soldCount: z
    .number()
    .int()
    .min(0, "Sold count must be a non-negative integer")
    .optional(),
  deletedAt: z.date().optional(),
});
