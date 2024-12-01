import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { TradingApp } from './components/trading/TradingApp';
import { ProfilePage } from './components/profile/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthRoute } from './components/auth/AuthRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: (
      <AuthRoute>
        <DashboardPage />
      </AuthRoute>
    ),
  },
  {
    path: '/trading',
    element: (
      <AuthRoute>
        <TradingApp />
      </AuthRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthRoute>
        <ProfilePage />
      </AuthRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <AuthRoute>
        <SettingsPage />
      </AuthRoute>
    ),
  },
]);