import { useAtom } from 'jotai';
import { adminUserAtom } from '../store/admin';

export function useAdminAuth() {
  const [adminUser] = useAtom(adminUserAtom);
  
  const isAdmin = adminUser?.role === 'ADMIN' || adminUser?.role === 'SUPER_ADMIN';
  const isSuperAdmin = adminUser?.role === 'SUPER_ADMIN';
  
  const hasPermission = (permissionCode: string) => {
    if (!adminUser || !isAdmin) return false;
    return adminUser.permissions.some(p => p.code === permissionCode);
  };

  return {
    user: adminUser,
    isAdmin,
    isSuperAdmin,
    hasPermission,
  };
}