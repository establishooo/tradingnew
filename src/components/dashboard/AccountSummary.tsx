import { User } from '../../types';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { StatCard } from './StatCard';

interface AccountSummaryProps {
  user: User;
}

export function AccountSummary({ user }: AccountSummaryProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="الرصيد المتاح"
        value={`$${user.balance.toLocaleString()}`}
        icon={DollarSign}
        trend={null}
      />
      <StatCard
        title="قيمة المحفظة"
        value={`$${user.portfolioValue.toLocaleString()}`}
        icon={TrendingUp}
        trend={+12.5}
      />
      <StatCard
        title="عدد الصفقات"
        value={stats.totalTrades.toString()}
        icon={Activity}
        trend={null}
      />
      <StatCard
        title="نسبة النجاح"
        value={`${stats.winRate.toFixed(1)}%`}
        icon={stats.winRate >= 50 ? TrendingUp : TrendingDown}
        trend={stats.winRate}
      />
    </div>
  );
}