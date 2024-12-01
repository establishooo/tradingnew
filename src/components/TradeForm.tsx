import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Stock } from '../types';
import { useTrading } from '../hooks/useTrading';
import { TradeConfirmation } from './trading/TradeConfirmation';

const tradeSchema = z.object({
  symbol: z.string(),
  quantity: z.number().min(1),
  orderType: z.enum(['MARKET', 'LIMIT', 'STOP_LOSS']),
  price: z.number().optional(),
  type: z.enum(['BUY', 'SELL'])
});

type TradeFormData = z.infer<typeof tradeSchema>;

interface TradeFormProps {
  stock: Stock;
}

export function TradeForm({ stock }: TradeFormProps) {
  const { executeTrade, isProcessing } = useTrading();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingTrade, setPendingTrade] = useState<TradeFormData | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      symbol: stock.symbol,
      orderType: 'MARKET',
      type: 'BUY',
      quantity: 1
    }
  });

  const onSubmit = (data: TradeFormData) => {
    setPendingTrade(data);
    setShowConfirmation(true);
  };

  const handleConfirmTrade = async () => {
    if (!pendingTrade) return;

    const result = await executeTrade(
      stock,
      pendingTrade.quantity,
      pendingTrade.type,
      pendingTrade.orderType,
      pendingTrade.price
    );

    setMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    });

    if (result.success) {
      reset();
    }

    setShowConfirmation(false);
    setPendingTrade(null);

    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Order Type</label>
          <select
            {...register('orderType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="MARKET">Market Order</option>
            <option value="LIMIT">Limit Order</option>
            <option value="STOP_LOSS">Stop Loss</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Trade Type</label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
        </div>

        {message && (
          <div className={`p-3 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>

      {showConfirmation && pendingTrade && (
        <TradeConfirmation
          stock={stock}
          quantity={pendingTrade.quantity}
          type={pendingTrade.type}
          orderType={pendingTrade.orderType}
          price={pendingTrade.price}
          onConfirm={handleConfirmTrade}
          onCancel={() => {
            setShowConfirmation(false);
            setPendingTrade(null);
          }}
        />
      )}
    </>
  );
}