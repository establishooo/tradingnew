import { useState } from 'react';
import { FileText, Plus, Edit, Trash } from 'lucide-react';

interface Content {
  id: string;
  title: string;
  type: 'GUIDE' | 'TUTORIAL' | 'FAQ';
  lastUpdated: Date;
}

export function ContentManager() {
  const [contents] = useState<Content[]>([]);
  const [selectedType, setSelectedType] = useState<'ALL' | 'GUIDE' | 'TUTORIAL' | 'FAQ'>('ALL');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Content Manager</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Content
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        {['ALL', 'GUIDE', 'TUTORIAL', 'FAQ'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type as any)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium
              ${selectedType === type
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {contents.map((content) => (
          <div
            key={content.id}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                <p className="text-sm text-gray-500">
                  Last updated: {content.lastUpdated.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-900">
                <Edit className="h-5 w-5" />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}