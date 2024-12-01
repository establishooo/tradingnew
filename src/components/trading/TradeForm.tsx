import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Stock } from '../../types';
import { useTrading } from '../../hooks/useTrading';
import { TradeConfirmation } from './TradeConfirmation';
import { Button } from '../ui/Button';

const tradeSchema = z.object({
  symbol: z.string(),
  quantity: z.number().min(1, 'الكمية يجب أن تكون أكبر من صفر'),
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

    try {
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
    } catch (error) {
      setMessage({
        text: 'حدث خطأ أثناء تنفيذ الصفقة',
        type: 'error'
      });
    }

    setShowConfirmation(false);
    setPendingTrade(null);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">نوع الأمر</label>
          <select
            {...register('orderType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="MARKET">أمر سوق</option>
            <option value="LIMIT">أمر محدد</option>
            <option value="STOP_LOSS">وقف خسارة</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">الكمية</label>
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
          <label className="block text-sm font-medium text-gray-700">نوع الصفقة</label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="BUY">شراء</option>
            <option value="SELL">بيع</option>
          </select>
        </div>

        {message && (
          <div className={`p-3 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? 'جاري التنفيذ...' : 'تنفيذ الصفقة'}
        </Button>
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