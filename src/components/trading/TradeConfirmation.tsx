import { Stock } from '../../types';

interface TradeConfirmationProps {
  stock: Stock;
  quantity: number;
  type: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT' | 'STOP_LOSS';
  price?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TradeConfirmation({
  stock,
  quantity,
  type,
  orderType,
  price,
  onConfirm,
  onCancel,
}: TradeConfirmationProps) {
  const totalCost = quantity * (price ?? stock.price);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Confirm Trade</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Stock:</span>
            <span className="font-semibold">{stock.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-semibold">{type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Order Type:</span>
            <span className="font-semibold">{orderType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-semibold">{quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price per Share:</span>
            <span className="font-semibold">${(price ?? stock.price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-600">Total Cost:</span>
            <span className="font-semibold">${totalCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}