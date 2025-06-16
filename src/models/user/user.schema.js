import z from "zod";

export const userSchema = z.object({
  fullname: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  address: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(validRoles).default("member"),
  phone_number: z.string().optional(),
  isActive: z.boolean().default(true),
  latestLogin: z.date().nullable().optional(),
  isVerifyEmail: z.boolean().default(false),
  isVerifyPhoneNumber: z.boolean().default(false),
  is2StepVerify: z.boolean().default(false),
});
export const updateUserSchema = z.object({
  fullname: z.string().min(1, "Họ và tên là bắt buộc").optional(),
  email: z.string().email("Email không hợp lệ").optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(validRoles).optional(),
  phone_number: z.string().optional(),
  isActive: z.boolean().optional(),
  latestLogin: z.date().nullable().optional(),
  isVerifyEmail: z.boolean().optional(),
  isVerifyPhoneNumber: z.boolean().optional(),
  is2StepVerify: z.boolean().optional(),
});
export const userLoginSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
export const userRegisterSchema = z.object({
  fullname: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  address: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(validRoles).default("member"),
  phone_number: z.string().optional(),
});
export const userForgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
});
export const userResetPasswordSchema = z
  .object({
    email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });
export const userChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Mật khẩu cũ phải có ít nhất 6 ký tự"),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmNewPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu mới phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu mới và xác nhận mật khẩu mới không khớp",
    path: ["confirmNewPassword"],
  });
