import { useAtom } from 'jotai';
import { userAtom } from '../../store/atoms';
import { StockList } from '../StockList';
import { StockChart } from './StockChart';
import { TradingPanel } from './TradingPanel';
import { EmptyState } from './EmptyState';
import { Navbar } from '../layout/Navbar';
import { useStockSelection } from './hooks/useStockSelection';

export function TradingApp() {
  const [user] = useAtom(userAtom);
  const { selectedStock, handleStockSelect } = useStockSelection();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <StockList onSelect={handleStockSelect} />
          </div>
          
          <div className="col-span-9">
            {selectedStock ? (
              <div className="space-y-6">
                <StockChart stock={selectedStock} />
                <TradingPanel stock={selectedStock} />
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}