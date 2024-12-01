import { useCallback } from 'react';
import { Stock, User } from '../../../types';

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function useTradeValidation(user: User | null) {
  const validateTrade = useCallback((
    stock: Stock,
    quantity: number,
    type: 'BUY' | 'SELL',
    price?: number
  ): ValidationResult => {
    if (!user) {
      return { isValid: false, message: 'يجب تسجيل الدخول لتنفيذ الصفقات' };
    }

    const tradeValue = quantity * (price ?? stock.price);

    if (type === 'BUY') {
      if (tradeValue > user.balance) {
        return { isValid: false, message: 'رصيد غير كافٍ لتنفيذ الصفقة' };
      }
    }

    if (quantity <= 0) {
      return { isValid: false, message: 'الكمية يجب أن تكون أكبر من صفر' };
    }

    return { isValid: true };
  }, [user]);

  return { validateTrade };
}