import { Bell, Settings, LogOut } from 'lucide-react';
import { AdminUser } from '../../../types/admin';

interface AdminHeaderProps {
  user: AdminUser;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-blue-600" />
            <span className="mr-2 text-xl font-bold text-gray-900">لوحة الإدارة</span>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}