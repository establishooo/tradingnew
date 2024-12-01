import { useState } from 'react';
import { useAtom } from 'jotai';
import { Save, AlertTriangle } from 'lucide-react';
import { systemSettingsAtom } from '../../../store/admin';
import { Toggle } from '../../ui/Toggle';
import { Button } from '../../ui/Button';
import { AdminAlert } from '../AdminAlert';
import { useAuditTrail } from '../../../hooks/useAuditTrail';

export function SystemSettings() {
  const [settings, setSettings] = useAtom(systemSettingsAtom);
  const [isSaving, setIsSaving] = useState(false);
  const { logAction } = useAuditTrail();

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings({ ...settings, [key]: !settings[key] });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      logAction('UPDATE_SETTINGS', 'تم تحديث إعدادات النظام');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إعدادات النظام</h2>
        <Button
          variant="primary"
          icon={Save}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>

      {!settings.tradingEnabled && (
        <AdminAlert
          icon={AlertTriangle}
          title="التداول معطل"
          message="التداول معطل حالياً في النظام. لن يتمكن المستخدمين من تنفيذ الصفقات."
          type="warning"
        />
      )}

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">إعدادات التداول</h3>
          <div className="space-y-4">
            <Toggle
              enabled={settings.tradingEnabled}
              onChange={() => handleToggle('tradingEnabled')}
              label="تفعيل التداول"
              description="السماح للمستخدمين بتنفيذ الصفقات"
            />

            <Toggle
              enabled={settings.maintenanceMode}
              onChange={() => handleToggle('maintenanceMode')}
              label="وضع الصيانة"
              description="تعطيل جميع عمليات التداول مؤقتاً"
            />

            <Toggle
              enabled={settings.registrationEnabled}
              onChange={() => handleToggle('registrationEnabled')}
              label="تفعيل التسجيل"
              description="السماح للمستخدمين الجدد بالتسجيل"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحد الأقصى لقيمة الصفقة
              </label>
              <input
                type="number"
                value={settings.maxTradeValue}
                onChange={(e) => setSettings({
                  ...settings,
                  maxTradeValue: Number(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الرصيد الافتتاحي للمستخدمين الجدد
              </label>
              <input
                type="number"
                value={settings.defaultInitialBalance}
                onChange={(e) => setSettings({
                  ...settings,
                  defaultInitialBalance: Number(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">إعدادات API</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                مفتاح Polygon.io API
              </label>
              <input
                type="password"
                value={settings.apiKeys.polygonApi}
                onChange={(e) => setSettings({
                  ...settings,
                  apiKeys: { ...settings.apiKeys, polygonApi: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">أنواع الأوامر المسموحة</h3>
          <div className="space-y-4">
            {(['MARKET', 'LIMIT', 'STOP_LOSS'] as const).map((type) => (
              <Toggle
                key={type}
                enabled={settings.allowedOrderTypes.includes(type)}
                onChange={() => {
                  const newTypes = settings.allowedOrderTypes.includes(type)
                    ? settings.allowedOrderTypes.filter(t => t !== type)
                    : [...settings.allowedOrderTypes, type];
                  setSettings({ ...settings, allowedOrderTypes: newTypes });
                }}
                label={type === 'MARKET' ? 'أمر سوق' : type === 'LIMIT' ? 'أمر محدد' : 'أمر وقف الخسارة'}
                description={`السماح للمستخدمين باستخدام أوامر ${
                  type === 'MARKET' ? 'السوق' : type === 'LIMIT' ? 'محددة' : 'وقف الخسارة'
                }`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}