import z from "zod";
export const voucherSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discountPercent: z
    .number()
    .min(0, "Discount percent must be at least 0")
    .max(100, "Discount percent cannot exceed 100"),
  maxDiscount: z.number().min(0, "Max discount must be at least 0"),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  isActive: z.boolean().default(true, "Is active must be a boolean"),
});

export const updateVoucherSchema = z.object({
  code: z.string().min(1, "Code is required").optional(),
  discountPercent: z
    .number()
    .min(0, "Discount percent must be at least 0")
    .max(100, "Discount percent cannot exceed 100")
    .optional(),
  maxDiscount: z.number().min(0, "Max discount must be at least 0").optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  isActive: z.boolean().optional(),
});
