import * as z from "zod";

const validSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

const sizeNumberEnum = z.number().refine((val) => validSizes.includes(val), {
  message: "Kích cỡ không hợp lệ",
});

export const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  brand: z
    .array(z.enum(["nike", "adidas", "puma", "reebok", "etc."]))
    .min(1, "Thương hiệu là bắt buộc"),
  categoryId: z.string().min(1, "Danh mục là bắt buộc"),
  price: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
  currency: z.string().min(1, "Tiền tệ là bắt buộc"),
  sizes: z.array(sizeNumberEnum).min(1, "Ít nhất một kích cỡ là bắt buộc"),
  colors: z
    .array(
      z.enum([
        "red",
        "blue",
        "green",
        "black",
        "white",
        "yellow",
        "pink",
        "purple",
      ])
    )
    .min(1, "Ít nhất một màu sắc là bắt buộc"),
  image: z.array(z.string()).optional(),
  inStock: z.boolean().optional(),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  deleteAt: z.date().nullable().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc").optional(),
  brand: z
    .array(z.enum(["nike", "adidas", "puma", "reebok", "etc."]))
    .min(1, "Thương hiệu là bắt buộc")
    .optional(),
  categoryId: z.string().min(1, "Danh mục là bắt buộc").optional(),
  price: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0").optional(),
  currency: z.string().min(1, "Tiền tệ là bắt buộc").optional(),
  sizes: z
    .array(sizeNumberEnum)
    .min(1, "Ít nhất một kích cỡ là bắt buộc")
    .optional(),
  colors: z
    .array(
      z.enum([
        "red",
        "blue",
        "green",
        "black",
        "white",
        "yellow",
        "pink",
        "purple",
      ])
    )
    .min(1, "Ít nhất một màu sắc là bắt buộc")
    .optional(),
  image: z.array(z.string()).optional(),
  inStock: z.boolean().optional(),
  description: z.string().min(1, "Mô tả là bắt buộc").optional(),
  deleteAt: z.date().nullable().optional(),
});
export const productIdSchema = z.object({
  id: z.string().min(1, "ID sản phẩm là bắt buộc"),
});
export const productQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  search: z.string().optional(),
  categoryId: z.string().optional(),
});
