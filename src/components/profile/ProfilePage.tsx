import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/auth';
import { ProfileLayout } from './ProfileLayout';
import { ProfileForm } from './ProfileForm';
import { TradeHistory } from './TradeHistory';
import { AccountStats } from './AccountStats';
import { UISettings } from './UISettings';

type ProfileTab = 'profile' | 'trades' | 'stats' | 'settings';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile');
  const [user] = useAtom(userAtom);

  if (!user) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm user={user} />;
      case 'trades':
        return <TradeHistory trades={user.trades} />;
      case 'stats':
        return <AccountStats user={user} />;
      case 'settings':
        return <UISettings />;
      default:
        return null;
    }
  };

  return (
    <ProfileLayout
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as ProfileTab)}
    >
      {renderContent()}
    </ProfileLayout>
  );
}