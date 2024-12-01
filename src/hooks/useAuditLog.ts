import { useState, useCallback } from 'react';
import { AuditLog } from '../types/admin';

export function useAuditLog() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const addLog = useCallback((log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setLogs((prev) => [newLog, ...prev]);
  }, []);

  return {
    logs,
    addLog,
  };
}