import { ReactNode } from 'react';
import { User, Settings, Bell, ChevronDown, LineChart } from 'lucide-react';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/auth';

interface ProfileLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProfileLayout({ children, activeTab, onTabChange }: ProfileLayoutProps) {
  const [user] = useAtom(userAtom);

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'trades', label: 'سجل التداول', icon: LineChart },
    { id: 'stats', label: 'الإحصائيات', icon: ChevronDown },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mr-4">
                  <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Settings className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <tab.icon className="h-5 w-5 ml-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}