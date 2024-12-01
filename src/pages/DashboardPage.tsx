import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { AccountSummary } from '../components/dashboard/AccountSummary';
import { QuickTrade } from '../components/dashboard/QuickTrade';
import { RecentTrades } from '../components/dashboard/RecentTrades';
import { MarketOverview } from '../components/dashboard/MarketOverview';

export function DashboardPage() {
  const [user] = useAtom(userAtom);

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AccountSummary user={user} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickTrade />
          <MarketOverview />
        </div>
        
        <RecentTrades trades={user.trades} />
      </div>
    </DashboardLayout>
  );
}