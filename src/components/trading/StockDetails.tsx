import { Stock } from '../../types';
import { cn } from '../../utils/cn';

interface StockDetailsProps {
  stock: Stock;
  className?: string;
}

export function StockDetails({ stock, className }: StockDetailsProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{stock.symbol}</h2>
          <p className="text-sm text-gray-500">{stock.name}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
          <p className={cn(
            "text-sm font-medium",
            stock.change >= 0 ? "text-green-600" : "text-red-600"
          )}>
            {stock.change >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
          </p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">حجم التداول</p>
          <p className="text-lg font-medium">{stock.volume.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">التغير</p>
          <p className="text-lg font-medium">${Math.abs(stock.change).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}