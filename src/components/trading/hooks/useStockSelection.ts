import { useState, useCallback } from 'react';
import { Stock } from '../../../types';

export function useStockSelection() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleStockSelect = useCallback((stock: Stock) => {
    setSelectedStock(stock);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedStock(null);
  }, []);

  return {
    selectedStock,
    handleStockSelect,
    clearSelection,
  };
}