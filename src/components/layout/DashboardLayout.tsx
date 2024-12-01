import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, LineChart, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navigation = [
    { name: 'لوحة التحكم', href: '/dashboard', icon: BarChart2 },
    { name: 'منصة التداول', href: '/trading', icon: LineChart },
    { name: 'الملف الشخصي', href: '/profile', icon: User },
    { name: 'الإعدادات', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <BarChart2 className="h-8 w-8 text-blue-600" />
                <span className="mr-2 text-xl font-bold text-gray-900">
                  منصة التداول
                </span>
              </div>

              <div className="hidden sm:mr-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      location.pathname === item.href
                        ? 'text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5 ml-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={logout}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}