import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AuthRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function AuthRoute({ children, requireAdmin = false }: AuthRouteProps) {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}