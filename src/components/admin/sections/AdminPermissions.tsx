import { useState } from 'react';
import { Shield, Users, Settings, Activity, BookOpen, FileText } from 'lucide-react';
import { Table } from '../../ui/Table';
import { Button } from '../../ui/Button';
import { SearchInput } from '../../ui/SearchInput';
import { AdminRole, Permission } from '../../../types/admin';

const mockPermissions: Permission[] = [
  { id: '1', code: 'MANAGE_USERS', name: 'إدارة المستخدمين', description: 'إدارة حسابات المستخدمين', category: 'USER_MANAGEMENT' },
  { id: '2', code: 'MANAGE_SYSTEM', name: 'إدارة النظام', description: 'إدارة إعدادات النظام', category: 'SYSTEM' },
  { id: '3', code: 'VIEW_ACTIVITY', name: 'عرض النشاطات', description: 'عرض سجل النشاطات', category: 'SYSTEM' },
  { id: '4', code: 'MANAGE_CONTENT', name: 'إدارة المحتوى', description: 'إدارة محتوى النظام', category: 'CONTENT' },
  { id: '5', code: 'VIEW_REPORTS', name: 'عرض التقارير', description: 'عرض تقارير النظام', category: 'REPORTS' },
];

const rolePermissions: Record<AdminRole, string[]> = {
  'SUPER_ADMIN': mockPermissions.map(p => p.code),
  'ADMIN': ['MANAGE_USERS', 'VIEW_ACTIVITY', 'MANAGE_CONTENT', 'VIEW_REPORTS'],
  'MODERATOR': ['VIEW_ACTIVITY', 'MANAGE_CONTENT'],
};

export function AdminPermissions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<AdminRole>('ADMIN');

  const filteredPermissions = mockPermissions.filter(permission =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category: Permission['category']) => {
    switch (category) {
      case 'USER_MANAGEMENT': return Users;
      case 'SYSTEM': return Settings;
      case 'CONTENT': return BookOpen;
      case 'REPORTS': return FileText;
      default: return Shield;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الصلاحيات</h2>
        <Button
          variant="primary"
          icon={Shield}
          onClick={() => {}}
        >
          إضافة صلاحية
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchInput
              placeholder="البحث في الصلاحيات..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="flex space-x-2">
            {(['SUPER_ADMIN', 'ADMIN', 'MODERATOR'] as AdminRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md
                  ${selectedRole === role
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {role === 'SUPER_ADMIN' ? 'مدير النظام' :
                 role === 'ADMIN' ? 'مدير' : 'مشرف'}
              </button>
            ))}
          </div>
        </div>

        <Table
          columns={[
            {
              header: 'الصلاحية',
              accessor: (permission) => {
                const Icon = getCategoryIcon(permission.category);
                return (
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-gray-400 ml-2" />
                    <div>
                      <div className="font-medium text-gray-900">{permission.name}</div>
                      <div className="text-sm text-gray-500">{permission.description}</div>
                    </div>
                  </div>
                );
              }
            },
            {
              header: 'التصنيف',
              accessor: (permission) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {permission.category === 'USER_MANAGEMENT' ? 'إدارة المستخدمين' :
                   permission.category === 'SYSTEM' ? 'النظام' :
                   permission.category === 'CONTENT' ? 'المحتوى' : 'التقارير'}
                </span>
              )
            },
            {
              header: 'الحالة',
              accessor: (permission) => {
                const hasPermission = rolePermissions[selectedRole].includes(permission.code);
                return (
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      hasPermission ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {hasPermission ? 'مفعل' : 'معطل'}
                    </span>
                  </div>
                );
              }
            },
          ]}
          data={filteredPermissions}
          keyExtractor={(permission) => permission.id}
        />
      </div>
    </div>
  );
}