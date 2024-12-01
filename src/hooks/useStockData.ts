import { useQuery } from '@tanstack/react-query';
import { Stock } from '../types';
import { PolygonService } from '../services/polygon';

export function useStockData(symbol: string) {
  return useQuery({
    queryKey: ['stock', symbol],
    queryFn: async () => {
      const data = await PolygonService.getStockQuotes([symbol]);
      return data[0];
    },
    enabled: !!symbol,
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 2,
  });
}