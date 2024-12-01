import { useEffect, useState } from 'react';
import { BarChart2, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { AdminStats as AdminStatsType } from '../../../types/admin';

export function AdminStats() {
  const [stats, setStats] = useState<AdminStatsType>({
    totalUsers: 1250,
    activeUsers: 856,
    totalTrades: 15678,
    dailyTradeVolume: 2345678,
    systemHealth: {
      status: 'HEALTHY',
      lastCheck: new Date(),
      issues: [],
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">لوحة المعلومات</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي المستخدمين"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          trend={+12.5}
        />
        <StatCard
          title="المستخدمين النشطين"
          value={stats.activeUsers.toLocaleString()}
          icon={Users}
          trend={+8.2}
        />
        <StatCard
          title="إجمالي الصفقات"
          value={stats.totalTrades.toLocaleString()}
          icon={TrendingUp}
          trend={+15.8}
        />
        <StatCard
          title="حجم التداول اليومي"
          value={`$${(stats.dailyTradeVolume / 1000000).toFixed(2)}M`}
          icon={BarChart2}
          trend={-2.3}
        />
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">حالة النظام</h3>
          <div className="flex items-center space-x-4">
            <StatusIndicator status={stats.systemHealth.status} />
            <div>
              <p className="text-sm text-gray-600">
                آخر فحص: {stats.systemHealth.lastCheck.toLocaleString()}
              </p>
              {stats.systemHealth.issues.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {stats.systemHealth.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-600 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: number;
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-8 w-8 text-blue-600" />
        <span className={`text-sm font-medium ${
          trend >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">{value}</h3>
      <p className="mt-1 text-sm text-gray-600">{title}</p>
    </div>
  );
}

function StatusIndicator({ status }: { status: AdminStatsType['systemHealth']['status'] }) {
  const colors = {
    HEALTHY: 'bg-green-500',
    WARNING: 'bg-yellow-500',
    CRITICAL: 'bg-red-500',
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${colors[status]}`} />
      <span className="text-sm font-medium text-gray-700">
        {status === 'HEALTHY' && 'النظام يعمل بشكل طبيعي'}
        {status === 'WARNING' && 'تحذيرات في النظام'}
        {status === 'CRITICAL' && 'مشاكل حرجة في النظام'}
      </span>
    </div>
  );
}