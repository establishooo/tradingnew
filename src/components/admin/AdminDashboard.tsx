import { useState } from 'react';
import { useAtom } from 'jotai';
import { adminUserAtom } from '../../store/admin';
import { AdminLayout } from './layout/AdminLayout';
import { AdminStats } from './sections/AdminStats';
import { UserManagement } from './sections/UserManagement';
import { SystemSettings } from './sections/SystemSettings';
import { ActivityMonitor } from './sections/ActivityMonitor';
import { ContentManager } from './sections/ContentManager';
import { ReportsSection } from './sections/ReportsSection';
import { AdminPermissions } from './sections/AdminPermissions';

type AdminSection = 'dashboard' | 'users' | 'system' | 'activity' | 'content' | 'reports' | 'permissions';

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [adminUser] = useAtom(adminUserAtom);

  if (!adminUser) return null;

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminStats />;
      case 'users':
        return <UserManagement />;
      case 'system':
        return <SystemSettings />;
      case 'activity':
        return <ActivityMonitor />;
      case 'content':
        return <ContentManager />;
      case 'reports':
        return <ReportsSection />;
      case 'permissions':
        return <AdminPermissions />;
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <AdminLayout
        activeSection={activeSection}
        onSectionChange={(section) => setActiveSection(section as AdminSection)}
      >
        <div className="p-6">
          {renderSection()}
        </div>
      </AdminLayout>
    </div>
  );
}