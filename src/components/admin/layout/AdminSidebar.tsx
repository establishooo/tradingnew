import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  items: SidebarItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ items, activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`
              w-full flex items-center px-4 py-3 text-sm font-medium rounded-md
              ${activeSection === item.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <item.icon className="h-5 w-5 ml-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}