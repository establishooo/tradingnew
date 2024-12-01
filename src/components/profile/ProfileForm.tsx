import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '../../types';
import { Button } from '../ui/Button';

const profileSchema = z.object({
  fullName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  currentPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: z.string().min(8, 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل').optional(),
  confirmPassword: z.string(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Implement profile update logic
      console.log('Profile update:', data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          الاسم الكامل
        </label>
        <input
          type="text"
          {...register('fullName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          كلمة المرور الحالية
        </label>
        <input
          type="password"
          {...register('currentPassword')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          كلمة المرور الجديدة (اختياري)
        </label>
        <input
          type="password"
          {...register('newPassword')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          تأكيد كلمة المرور الجديدة
        </label>
        <input
          type="password"
          {...register('confirmPassword')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>
    </form>
  );
}