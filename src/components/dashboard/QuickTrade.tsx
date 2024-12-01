import { useState } from 'react';
import { useStockPrices } from '../../hooks/useStockPrices';
import { StockList } from '../StockList';
import { TradeForm } from '../trading/TradeForm';
import { EmptyState } from '../trading/EmptyState';

export function QuickTrade() {
  const { stocks } = useStockPrices();
  const [selectedStock, setSelectedStock] = useState(stocks?.[0] || null);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">تداول سريع</h2>
      
      {selectedStock ? (
        <TradeForm stock={selectedStock} />
      ) : (
        <EmptyState />
      )}

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">الأسهم المتاحة</h3>
        <div className="h-64 overflow-y-auto">
          <StockList onSelect={setSelectedStock} />
        </div>
      </div>
    </div>
  );
}