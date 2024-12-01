import { useAtom } from 'jotai';
import { systemSettingsAtom } from '../store/admin';
import { useCallback } from 'react';
import { SystemSettings } from '../types/admin';

export function useSystemSettings() {
  const [settings, setSettings] = useAtom(systemSettingsAtom);

  const updateSettings = useCallback((updates: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, [setSettings]);

  const toggleSetting = useCallback((key: keyof SystemSettings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  }, [settings, setSettings]);

  return {
    settings,
    updateSettings,
    toggleSetting,
  };
}