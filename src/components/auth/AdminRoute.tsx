import { ReactNode } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

interface AdminRouteProps {
  children: ReactNode;
  requiredPermission?: string;
}

export function AdminRoute({ children, requiredPermission }: AdminRouteProps) {
  const { isAdmin, hasPermission, user } = useAdminAuth();

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">غير مصرح</h2>
          <p className="mt-2 text-gray-600">عذراً، لا تملك صلاحية الوصول إلى هذه المنطقة</p>
        </div>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">صلاحية مطلوبة</h2>
          <p className="mt-2 text-gray-600">تحتاج إلى صلاحيات إضافية للوصول إلى هذه الميزة</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}