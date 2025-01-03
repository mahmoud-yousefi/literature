import React, { useState } from 'react';
import { Input, List, Card, Button } from 'antd';
import EmptyState from '../components/EmptyState';
import { SearchOutlined } from '@ant-design/icons';

type LiteraryResource = {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
};

const mockResources: LiteraryResource[] = [
  {
    id: 1,
    title: 'بوستان سعدی',
    author: 'سعدی شیرازی',
    description: 'یکی از ارزشمندترین آثار ادبی فارسی که شامل نصایح اخلاقی و اشعار زیبا است.',
    cover: 'https://kaamakketab.com/wp-content/uploads/2020/09/%D8%A8%D9%88%D8%B3%D8%AA%D8%A7%D9%86-%D8%B3%D8%B9%D8%AF%DB%8C-%DA%AF%D9%88%DB%8C%D8%A7.jpg',
  },
  {
    id: 2,
    title: 'شاهنامه',
    author: 'فردوسی',
    description: 'حماسه ملی ایرانیان که تاریخ ایران زمین را در قالب اشعار به تصویر کشیده است.',
    cover: 'https://negahpub.com/wp-content/uploads/2022/09/Shahnameh1.jpg',
  },
  {
    id: 3,
    title: 'دیوان حافظ',
    author: 'حافظ شیرازی',
    description: 'مجموعه‌ای از اشعار عاشقانه و عارفانه که در دل هر ایرانی جای دارد.',
    cover: 'https://payamedalat.com/wp-content/uploads/2022/03/%D8%AF%DB%8C%D9%88%D8%A7%D9%86-%D8%AD%D8%A7%D9%81%D8%B8-4.jpg',
  },
];

const MemoriesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [resources, setResources] = useState<LiteraryResource[]>(mockResources);

  const handleSearch = () => {
    const filteredResources = mockResources.filter((resource) =>
      resource.title.includes(query) || resource.author.includes(query)
    );
    setResources(filteredResources);
  };

  React.useEffect(() => {
    if (!query)
      handleSearch();
  }, [query]);

  return (
    <div className='p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-2xl font-bold pb-4">خاطرات استاد</h1>
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <Input
            placeholder="عنوان یا نام نویسنده را وارد کنید..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full dark:bg-gray-700 dark:text-white dark:placeholder:text-white rounded-l-none"
          />
          <Button
            type="primary"
            onClick={handleSearch}
            className="!ml-2 h-full rounded-r-none p-2"
            icon={
              <SearchOutlined />
            }
          />
        </div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
          }}
          dataSource={resources}
          renderItem={(resource) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={resource.title}
                    src={resource.cover}
                    className="h-48 object-cover"
                  />
                }
              >
                <Card.Meta
                  title={resource.title}
                  description={
                    <>
                      <p className="text-sm font-medium">{resource.author}</p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {resource.description}
                      </p>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
          locale={{ emptyText: <EmptyState />, }}
        />
      </div>
    </div>
  );
};

export default MemoriesPage;
