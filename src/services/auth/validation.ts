import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(50, 'الاسم لا يمكن أن يتجاوز 50 حرفاً'),
  email: z.string()
    .email('البريد الإلكتروني غير صالح')
    .min(5, 'البريد الإلكتروني قصير جداً')
    .max(100, 'البريد الإلكتروني طويل جداً'),
  password: z.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'كلمة المرور يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز خاصة'
    ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string()
    .email('البريد الإلكتروني غير صالح'),
  password: z.string()
    .min(1, 'كلمة المرور مطلوبة'),
  rememberMe: z.boolean().optional(),
});

export const resetPasswordSchema = z.object({
  email: z.string()
    .email('البريد الإلكتروني غير صالح'),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string()
    .min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: z.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'كلمة المرور يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز خاصة'
    ),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;