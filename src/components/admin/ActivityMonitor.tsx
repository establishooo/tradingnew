import { useState } from 'react';
import { format } from 'date-fns';
import { AuditLog } from '../../types/admin';

export function ActivityMonitor() {
  const [logs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'trades' | 'users' | 'system'>('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Activity Monitor</h2>
        <div className="flex space-x-2">
          {['all', 'trades', 'users', 'system'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`
                px-3 py-1 rounded-md text-sm font-medium
                ${filter === type
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(log.timestamp, 'yyyy-MM-dd HH:mm:ss')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.details}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}