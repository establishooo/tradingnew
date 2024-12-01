import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Filter, Download } from 'lucide-react';
import { AuditLog } from '../../../types/admin';
import { Table } from '../../ui/Table';
import { SearchInput } from '../../ui/SearchInput';
import { Button } from '../../ui/Button';

type ActivityFilter = 'all' | 'users' | 'trades' | 'system' | 'auth';

const mockLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    action: 'USER_LOGIN',
    details: 'تسجيل دخول مستخدم',
    timestamp: new Date(),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    status: 'SUCCESS',
  },
  {
    id: '2',
    userId: '2',
    action: 'EXECUTE_TRADE',
    details: 'تنفيذ صفقة AAPL',
    timestamp: new Date(),
    ipAddress: '192.168.1.2',
    userAgent: 'Chrome/91.0',
    status: 'SUCCESS',
  },
  {
    id: '3',
    userId: '1',
    action: 'UPDATE_SETTINGS',
    details: 'تحديث إعدادات النظام',
    timestamp: new Date(),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    status: 'SUCCESS',
  },
];

export function ActivityMonitor() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState<ActivityFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLogs(mockLogs);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'all') return matchesSearch;
    return matchesSearch && log.action.toLowerCase().startsWith(filter);
  });

  const handleExport = () => {
    const csv = [
      ['التاريخ', 'المستخدم', 'الإجراء', 'التفاصيل', 'الحالة', 'عنوان IP'],
      ...filteredLogs.map(log => [
        format(log.timestamp, 'yyyy-MM-dd HH:mm:ss'),
        log.userId,
        log.action,
        log.details,
        log.status,
        log.ipAddress,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `activity-log-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">سجل النشاطات</h2>
        <Button
          variant="secondary"
          icon={Download}
          onClick={handleExport}
        >
          تصدير السجل
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchInput
              placeholder="البحث في السجل..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="flex space-x-2">
            {(['all', 'users', 'trades', 'system', 'auth'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md
                  ${filter === type
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {type === 'all' ? 'الكل' :
                 type === 'users' ? 'المستخدمين' :
                 type === 'trades' ? 'التداول' :
                 type === 'system' ? 'النظام' : 'الدخول'}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">جاري تحميل البيانات...</p>
          </div>
        ) : (
          <Table
            columns={[
              {
                header: 'التاريخ',
                accessor: (log) => format(log.timestamp, 'yyyy-MM-dd HH:mm:ss')
              },
              { header: 'المستخدم', accessor: 'userId' },
              { header: 'الإجراء', accessor: 'action' },
              { header: 'التفاصيل', accessor: 'details' },
              {
                header: 'الحالة',
                accessor: (log) => (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    log.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {log.status === 'SUCCESS' ? 'نجاح' : 'فشل'}
                  </span>
                )
              },
              { header: 'عنوان IP', accessor: 'ipAddress' },
            ]}
            data={filteredLogs}
            keyExtractor={(log) => log.id}
          />
        )}
      </div>
    </div>
  );
}