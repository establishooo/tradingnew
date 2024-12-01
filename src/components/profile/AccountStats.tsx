import { User } from '../../types';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface AccountStatsProps {
  user: User;
}

export function AccountStats({ user }: AccountStatsProps) {
  const stats = {
    totalTrades: user.trades.length,
    successfulTrades: user.trades.filter(t => t.status === 'COMPLETED').length,
    totalProfit: user.trades.reduce((acc, trade) => {
      if (trade.type === 'SELL' && trade.status === 'COMPLETED') {
        return acc + (trade.price * trade.quantity);
      }
      return acc;
    }, 0),
    winRate: user.trades.length > 0
      ? (user.trades.filter(t => t.status === 'COMPLETED').length / user.trades.length) * 100
      : 0,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الصفقات"
          value={stats.totalTrades.toString()}
          icon={Activity}
          trend={null}
        />
        <StatCard
          title="الصفقات الناجحة"
          value={`${stats.successfulTrades} (${stats.winRate.toFixed(1)}%)`}
          icon={TrendingUp}
          trend={stats.winRate}
          trendSuffix="%"
        />
        <StatCard
          title="إجمالي الأرباح"
          value={`$${stats.totalProfit.toLocaleString()}`}
          icon={DollarSign}
          trend={stats.totalProfit > 0 ? +15.2 : -8.4}
          trendSuffix="%"
        />
        <StatCard
          title="قيمة المحفظة"
          value={`$${user.portfolioValue.toLocaleString()}`}
          icon={TrendingUp}
          trend={+12.5}
          trendSuffix="%"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          إحصائيات إضافية
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              توزيع الصفقات
            </h4>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              {/* Add chart here */}
              <p className="text-gray-500">الرسم البياني قيد التطوير</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              أداء المحفظة
            </h4>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              {/* Add chart here */}
              <p className="text-gray-500">الرسم البياني قيد التطوير</p>
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
  trend: number | null;
  trendSuffix?: string;
}

function StatCard({ title, value, icon: Icon, trend, trendSuffix = '' }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-8 w-8 text-blue-600" />
        {trend !== null && (
          <span className={`text-sm font-medium ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend >= 0 ? '+' : ''}{trend}{trendSuffix}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">{value}</h3>
      <p className="mt-1 text-sm text-gray-600">{title}</p>
    </div>
  );
}