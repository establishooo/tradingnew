import { useState } from 'react';
import { Users, UserPlus, Edit2, Trash2, Shield } from 'lucide-react';
import { SearchInput } from '../../ui/SearchInput';
import { Table } from '../../ui/Table';
import { Button } from '../../ui/Button';
import { useUsers } from '../../../hooks/useUsers';

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, isLoading, error } = useUsers();
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredUsers = users?.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h2>
        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => setShowAddUser(true)}
        >
          إضافة مستخدم
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <SearchInput
            placeholder="البحث عن مستخدم..."
            onSearch={setSearchTerm}
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">جاري تحميل البيانات...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">حدث خطأ أثناء تحميل البيانات</p>
          </div>
        ) : (
          <Table
            columns={[
              { header: 'المستخدم', accessor: (user) => (
                <div>
                  <div className="font-medium text-gray-900">{user.fullName}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              )},
              { header: 'الرصيد', accessor: (user) => (
                <span className="font-medium">${user.balance.toLocaleString()}</span>
              )},
              { header: 'الحالة', accessor: (user) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                  user.status === 'SUSPENDED' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.status === 'ACTIVE' ? 'نشط' :
                   user.status === 'SUSPENDED' ? 'موقوف' :
                   'غير نشط'}
                </span>
              )},
              { header: 'الإجراءات', accessor: (user) => (
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Shield className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )},
            ]}
            data={filteredUsers || []}
            keyExtractor={(user) => user.id}
          />
        )}
      </div>
    </div>
  );
}