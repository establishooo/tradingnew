import { ReactNode } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

interface AdminRouteProps {
  children: ReactNode;
  requiredPermission?: string;
}

export function AdminRoute({ children, requiredPermission }: AdminRouteProps) {
  const { isAdmin, hasPermission } = useAdminAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Permission Required</h2>
          <p className="mt-2 text-gray-600">You need additional permissions to access this feature.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}