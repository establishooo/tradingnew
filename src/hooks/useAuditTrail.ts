import { useCallback } from 'react';
import { useAuditLog } from './useAuditLog';
import { useAdminAuth } from './useAdminAuth';

export function useAuditTrail() {
  const { addLog } = useAuditLog();
  const { user } = useAdminAuth();

  const logAction = useCallback((
    action: string,
    details: string,
    ipAddress: string = '127.0.0.1' // In a real app, get the actual IP
  ) => {
    if (!user) return;

    addLog({
      userId: user.id,
      action,
      details,
      ipAddress,
    });
  }, [user, addLog]);

  return {
    logAction,
  };
}