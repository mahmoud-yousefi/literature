import React, { useState } from 'react';
import { Input, List, Card } from 'antd';
import EmptyState from '../components/EmptyState';

// Mock data for poems
type Poem = {
  id: number;
  title: string;
  poet: string;
  content: string;
};

const mockPoems: Poem[] = [
  {
    id: 1,
    title: 'رباعیات خیام',
    poet: 'عمر خیام',
    content: 'این قافلهٔ عمر عجب می‌گذرد / دریاب دمی که با طرب می‌گذرد',
  },
  {
    id: 2,
    title: 'غزلیات حافظ',
    poet: 'حافظ شیرازی',
    content: 'الا یا ایها الساقی ادر کاساً و ناولها / که عشق آسان نمود اول ولی افتاد مشکل‌ها',
  },
  {
    id: 3,
    title: 'شاهنامه',
    poet: 'فردوسی',
    content: 'بسی رنج بردم در این سال سی / عجم زنده کردم بدین پارسی',
  },
];

const PoemsPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [poems, setPoems] = useState<Poem[]>(mockPoems);

  const handleSearch = () => {
    const filteredPoems = mockPoems.filter(
      (poem) =>
        poem.title.includes(query) ||
        poem.poet.includes(query) ||
        poem.content.includes(query)
    );
    setPoems(filteredPoems);
  };

  return (
    <div className='p-4 bg-gray-50 dark:bg-gray-900'>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center pb-4">اشعار استاد</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Input
            placeholder="عنوان شعر، شاعر یا بخشی از متن را وارد کنید..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            جستجو
          </button>
        </div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
          }}
          dataSource={poems}
          renderItem={(poem) => (
            <List.Item>
              <Card hoverable>
                <h3 className="text-lg font-bold mb-2">{poem.title}</h3>
                <p className="text-gray-700 mb-2">{poem.poet}</p>
                <p className="text-gray-500">{poem.content}</p>
              </Card>
            </List.Item>
          )}
          locale={{ emptyText: <EmptyState />, }}
        />
      </div>
    </div>
  );
};

export default PoemsPage;