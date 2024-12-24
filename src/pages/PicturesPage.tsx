import React, { useState } from 'react';
import { Input, Button, List, Card } from 'antd';
import EmptyState from '../components/EmptyState';

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
};

const mockBooks: Book[] = [
  {
    id: 1,
    title: 'صد سال تنهایی',
    author: 'گابریل گارسیا مارکز',
    cover: 'https://img.ketabrah.ir/img/l/4914926097353970.jpg',
  },
  {
    id: 2,
    title: 'کلیدر',
    author: 'محمود دولت‌آبادی',
    cover: 'https://cdn.fidibo.com/phoenixpub/content/9f4a3f5a-4cad-4786-821c-da47817b0e60/9179643d-f204-4f71-8563-30f6e7ff6243.jpg',
  },
  {
    id: 3,
    title: 'ملت عشق',
    author: 'الیف شافاک',
    cover: 'https://ketabhesekhoob.ir/wp-content/uploads/2022/10/Scan30034.jpg',
  }
]

const PicturesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>(mockBooks);

  const handleSearch = () => {
    const filteredBooks = mockBooks.filter((book) =>
      book.title.includes(query)
    );
    setBooks(filteredBooks);
  };

  return (
    <div className='p-4 bg-gray-50 dark:bg-gray-900'>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center pb-4">جستجوی عکس</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Input
            placeholder="عنوان عکس را وارد کنید..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          <Button type="primary" onClick={handleSearch} className="w-full sm:w-auto">
            جستجو
          </Button>
        </div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
          }}
          dataSource={books}
          renderItem={(book) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={book.title}
                    src={book.cover}
                    className="h-48 object-cover"
                  />
                }
              >
                <Card.Meta title={book.title} description={book.author} />
              </Card>
            </List.Item>
          )}
          locale={{ emptyText: <EmptyState />, }}
        />
      </div>
    </div>
  );
};

export default PicturesPage;
