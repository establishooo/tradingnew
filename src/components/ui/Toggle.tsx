import { cn } from '../../utils/cn';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
  description?: string;
  className?: string;
}

export function Toggle({ enabled, onChange, label, description, className }: ToggleProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
          "transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          enabled ? "bg-blue-600" : "bg-gray-200"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0",
            "transition duration-200 ease-in-out",
            enabled ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}