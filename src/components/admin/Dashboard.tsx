import { useState } from 'react';
import { useAtom } from 'jotai';
import { Users, Settings, Activity, BookOpen, AlertTriangle } from 'lucide-react';
import { systemSettingsAtom } from '../../store/admin';
import { UserManagement } from './UserManagement';
import { SystemConfiguration } from './SystemConfiguration';
import { ActivityMonitor } from './ActivityMonitor';
import { ContentManager } from './ContentManager';
import { AdminAlert } from './AdminAlert';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'activity' | 'content'>('users');
  const [settings] = useAtom(systemSettingsAtom);

  const tabs = [
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'system', label: 'إعدادات النظام', icon: Settings },
    { id: 'activity', label: 'مراقبة النشاط', icon: Activity },
    { id: 'content', label: 'إدارة المحتوى', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {settings.maintenanceMode && (
          <AdminAlert
            icon={AlertTriangle}
            title="وضع الصيانة مفعل"
            message="النظام حالياً في وضع الصيانة. جميع عمليات التداول معطلة."
            type="warning"
          />
        )}

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`
                    flex items-center px-6 py-4 text-sm font-medium
                    ${activeTab === id
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 ml-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'system' && <SystemConfiguration />}
            {activeTab === 'activity' && <ActivityMonitor />}
            {activeTab === 'content' && <ContentManager />}
          </div>
        </div>
      </div>
    </div>
  );
}