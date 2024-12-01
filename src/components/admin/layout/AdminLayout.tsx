import { ReactNode } from 'react';
import {
  Users,
  Settings,
  Activity,
  BookOpen,
  LogOut,
  BarChart2,
  FileText,
  Shield
} from 'lucide-react';
import { useAtom } from 'jotai';
import { adminUserAtom } from '../../../store/admin';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  const [adminUser] = useAtom(adminUserAtom);

  const navigationItems = [
    { id: 'dashboard', label: 'لوحة المعلومات', icon: BarChart2 },
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'system', label: 'إعدادات النظام', icon: Settings },
    { id: 'activity', label: 'سجل النشاطات', icon: Activity },
    { id: 'content', label: 'إدارة المحتوى', icon: BookOpen },
    { id: 'reports', label: 'التقارير', icon: FileText },
    { id: 'permissions', label: 'الصلاحيات', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <AdminHeader user={adminUser} />
      
      <div className="flex">
        <AdminSidebar
          items={navigationItems}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}