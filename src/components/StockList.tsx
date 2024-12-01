import { useState, useCallback } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Stock } from '../types';
import { useStockPrices } from '../hooks/useStockPrices';

interface StockListProps {
  onSelect: (stock: Stock) => void;
}

export function StockList({ onSelect }: StockListProps) {
  const [search, setSearch] = useState('');
  const { stocks, isLoading, error } = useStockPrices();

  const handleSearch = useCallback((value: string) => {
    setSearch(value.toLowerCase());
  }, []);

  const filteredStocks = stocks?.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search) ||
      stock.name.toLowerCase().includes(search)
  ) ?? [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">جاري تحميل الأسهم...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <p className="text-center text-red-600">فشل تحميل بيانات الأسهم</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="البحث عن سهم..."
          className="w-full pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      
      <div className="overflow-y-auto max-h-[600px]">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
              onClick={() => onSelect(stock)}
            >
              <div>
                <h3 className="font-semibold">{stock.symbol}</h3>
                <p className="text-sm text-gray-600">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${stock.price.toFixed(2)}</p>
                <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 py-4">لا توجد نتائج</p>
        )}
      </div>
    </div>
  );
}