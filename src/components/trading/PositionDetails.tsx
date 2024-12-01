import { Stock } from '../../types';

interface PositionDetailsProps {
  stock: Stock;
}

export function PositionDetails({ stock }: PositionDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Position Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Current Price:</span>
          <span className="font-semibold">${stock.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Day Change:</span>
          <span className={`font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Volume:</span>
          <span className="font-semibold">{stock.volume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}