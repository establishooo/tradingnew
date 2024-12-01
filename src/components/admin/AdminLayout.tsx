import { ReactNode } from 'react';
import { Users, Settings, Activity, BookOpen, LogOut, BarChart2 } from 'lucide-react';
import { useAtom } from 'jotai';
import { adminUserAtom } from '../../store/admin';

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  const [adminUser] = useAtom(adminUserAtom);

  if (!adminUser) return null;

  const navigationItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart2 },
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'system', label: 'إعدادات النظام', icon: Settings },
    { id: 'activity', label: 'سجل النشاطات', icon: Activity },
    { id: 'content', label: 'إدارة المحتوى', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600" />
              <span className="mr-2 text-xl font-bold text-gray-900">لوحة الإدارة</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {adminUser.fullName}
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <LogOut className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  w-full flex items-center px-4 py-3 text-sm font-medium rounded-md
                  ${activeSection === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className="h-5 w-5 ml-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}