import { Stock } from '../../types';
import { TradeForm } from './TradeForm';
import { PositionDetails } from './PositionDetails';

interface TradingPanelProps {
  stock: Stock;
}

export function TradingPanel({ stock }: TradingPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">تنفيذ صفقة</h2>
        <TradeForm stock={stock} />
      </div>
      <PositionDetails stock={stock} />
    </div>
  );
}