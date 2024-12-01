import { useAtom } from 'jotai';
import { useState, useCallback } from 'react';
import { userAtom, adminUserAtom } from '../store/atoms';
import { User } from '../types';
import { AdminUser } from '../types/admin';

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [adminUser, setAdminUser] = useAtom(adminUserAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock admin login
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser: AdminUser = {
          id: '1',
          fullName: 'مدير النظام',
          email,
          role: 'SUPER_ADMIN',
          permissions: [],
          lastLogin: new Date(),
          createdAt: new Date(),
          status: 'ACTIVE'
        };
        setAdminUser(adminUser);
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        return;
      }

      // Mock regular user login
      const mockUser: User = {
        id: '1',
        fullName: 'مستخدم تجريبي',
        email,
        balance: 100000,
        portfolioValue: 0,
        trades: [],
        status: 'ACTIVE'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError('فشل تسجيل الدخول. يرجى التحقق من بيانات الدخول.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setAdminUser]);

  const logout = useCallback(() => {
    setUser(null);
    setAdminUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('adminUser');
  }, [setUser, setAdminUser]);

  const isAdmin = useCallback(() => {
    return !!adminUser;
  }, [adminUser]);

  return {
    user: adminUser || user,
    isLoading,
    error,
    login,
    logout,
    isAdmin,
  };
}