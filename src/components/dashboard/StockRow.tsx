import { Stock } from '../../types';

interface StockRowProps {
  stock: Stock;
  onClick?: () => void;
}

export function StockRow({ stock, onClick }: StockRowProps) {
  return (
    <div 
      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div>
        <div className="font-medium">{stock.symbol}</div>
        <div className="text-sm text-gray-500">{stock.name}</div>
      </div>
      <div className="text-right">
        <div className="font-medium">${stock.price.toFixed(2)}</div>
        <div className={`text-sm ${
          stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}