import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/auth';
import { User } from '../../types';
import { Edit2, Trash2, UserPlus } from 'lucide-react';

export function UserManagement() {
  const [users] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <UserPlus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow overflow-hidden rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trades
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  ${user.balance.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.trades.length}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}