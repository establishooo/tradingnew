import { useMemo } from 'react';
import { Chart } from '../Chart';
import { Stock } from '../../types';
import { generateChartData } from '../../utils/chartUtils';

interface StockChartProps {
  stock: Stock;
}

export function StockChart({ stock }: StockChartProps) {
  const chartData = useMemo(() => generateChartData(stock), [stock]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {stock.symbol} - {stock.name}
        </h2>
        <div className="text-right">
          <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
          <p className={`text-sm font-medium ${
            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </p>
        </div>
      </div>
      <Chart data={chartData} symbol={stock.symbol} />
    </div>
  );
}