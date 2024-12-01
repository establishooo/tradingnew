import { useStockPrices } from '../../hooks/useStockPrices';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../../types';
import { StockRow } from './StockRow';

export function MarketOverview() {
  const { stocks, isLoading } = useStockPrices();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">نظرة عامة على السوق</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const gainers = [...(stocks || [])]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);

  const losers = [...(stocks || [])]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">نظرة عامة على السوق</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <TrendingUp className="h-5 w-5 text-green-500 ml-1" />
            الأكثر ارتفاعاً
          </h3>
          <div className="space-y-2">
            {gainers.map((stock) => (
              <StockRow key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <TrendingDown className="h-5 w-5 text-red-500 ml-1" />
            الأكثر انخفاضاً
          </h3>
          <div className="space-y-2">
            {losers.map((stock) => (
              <StockRow key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}