import { useAtom } from 'jotai';
import { userAtom } from '../store/auth';
import { Trade, Stock } from '../types';
import { useState } from 'react';

interface TradeResult {
  success: boolean;
  message: string;
}

export function useTrading() {
  const [user, setUser] = useAtom(userAtom);
  const [isProcessing, setIsProcessing] = useState(false);

  const executeTrade = async (
    stock: Stock,
    quantity: number,
    type: 'BUY' | 'SELL',
    orderType: 'MARKET' | 'LIMIT' | 'STOP_LOSS',
    price?: number
  ): Promise<TradeResult> => {
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    setIsProcessing(true);
    try {
      const totalCost = quantity * stock.price;

      if (type === 'BUY' && totalCost > user.balance) {
        return { success: false, message: 'Insufficient funds' };
      }

      const trade: Trade = {
        id: crypto.randomUUID(),
        userId: user.id,
        symbol: stock.symbol,
        type,
        quantity,
        price: stock.price,
        orderType,
        status: 'COMPLETED',
        timestamp: new Date(),
      };

      const newBalance = type === 'BUY' 
        ? user.balance - totalCost 
        : user.balance + totalCost;

      setUser({
        ...user,
        balance: newBalance,
        trades: [...user.trades, trade],
      });

      return { 
        success: true, 
        message: `Successfully ${type.toLowerCase()}ed ${quantity} shares of ${stock.symbol}` 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Failed to execute trade' 
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    executeTrade,
    isProcessing,
  };
}