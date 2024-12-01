import { useState } from 'react';
import { FileText, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { SearchInput } from '../../ui/SearchInput';

interface Content {
  id: string;
  title: string;
  type: 'GUIDE' | 'TUTORIAL' | 'FAQ';
  lastUpdated: Date;
}

const mockContent: Content[] = [
  {
    id: '1',
    title: 'دليل التداول للمبتدئين',
    type: 'GUIDE',
    lastUpdated: new Date(),
  },
  {
    id: '2',
    title: 'كيفية تحليل الرسوم البيانية',
    type: 'TUTORIAL',
    lastUpdated: new Date(),
  },
  {
    id: '3',
    title: 'الأسئلة الشائعة حول التداول',
    type: 'FAQ',
    lastUpdated: new Date(),
  },
];

export function ContentManager() {
  const [contents, setContents] = useState<Content[]>(mockContent);
  const [selectedType, setSelectedType] = useState<'ALL' | 'GUIDE' | 'TUTORIAL' | 'FAQ'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
    return selectedType === 'ALL' ? matchesSearch : matchesSearch && content.type === selectedType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إدارة المحتوى</h2>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => {}}
        >
          إضافة محتوى
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchInput
              placeholder="البحث في المحتوى..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="flex space-x-2">
            {(['ALL', 'GUIDE', 'TUTORIAL', 'FAQ'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md
                  ${selectedType === type
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {type === 'ALL' ? 'الكل' :
                 type === 'GUIDE' ? 'الأدلة' :
                 type === 'TUTORIAL' ? 'الدروس' : 'الأسئلة الشائعة'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredContent.map((content) => (
            <div
              key={content.id}
              className="bg-white border rounded-lg p-6 flex items-center justify-between"
            >
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-500 ml-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                  <p className="text-sm text-gray-500">
                    آخر تحديث: {content.lastUpdated.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit2 className="h-5 w-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}