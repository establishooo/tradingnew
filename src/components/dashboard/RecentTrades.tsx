import { Trade } from '../../types';
import { TradeHistory } from '../trading/TradeHistory';

interface RecentTradesProps {
  trades: Trade[];
}

export function RecentTrades({ trades }: RecentTradesProps) {
  const recentTrades = trades
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">آخر الصفقات</h2>
      {recentTrades.length > 0 ? (
        <TradeHistory trades={recentTrades} />
      ) : (
        <div className="text-center py-12 text-gray-500">
          لا توجد صفقات حتى الآن
        </div>
      )}
    </div>
  );
}