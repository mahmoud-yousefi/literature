import React, { useState } from 'react';
import { Input, List, Card, Button, notification, Pagination, Modal } from 'antd';
import EmptyState from '../components/EmptyState';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type LiteraryMemory = {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
};

const mockMemories: LiteraryMemory[] = [
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
  const [memories, setMemories] = useState<(LiteraryMemory & { isAddCard?: boolean })[]>(mockMemories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMemory, setNewMemory] = useState<{ title: string; cover: string, description: string }>({ title: '', cover: '', description: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 8;

  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    const filteredPictures = mockMemories.filter((memory) =>
      memory.title.includes(query) || memory.author.includes(query)
    );
    setMemories(filteredPictures);
    setCurrentPage(1);
    setLoading(false);
  };

  const handleAddMemory = () => {
    if (newMemory.title && newMemory.cover) {
      const newId = memories.length ? memories[memories.length - 1].id + 1 : 1;
      setMemories([...memories, { id: newId, title: newMemory.title, author: 'ناشناس', cover: newMemory.cover, description: newMemory.description }]);
      setNewMemory({ title: '', cover: '', description: '' });
      setIsModalVisible(false);
    } else {
      notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
    }
  };

  const handleMemoryClick = (id: number) => {
    navigate(`/memories/${id}`);
  };

  React.useEffect(() => {
    if (!query)
      handleSearch();
  }, [query]);

  const paginatedMemories = memories.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
          loading={loading}
          dataSource={[...paginatedMemories, { id: 0, title: '', author: '', cover: '', description: '', isAddCard: true }]}
          renderItem={(memory) =>
            memory.isAddCard ? (
              <List.Item>
                <Card
                  hoverable
                  className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  onClick={() => setIsModalVisible(true)}
                >
                  <div className="bg-gray-100 rounded-full p-6 flex items-center justify-center mb-4 dark:bg-gray-700">
                    <PlusOutlined className="text-4xl text-gray-500 dark:text-white" />
                  </div>
                  <p className="text-gray-600 font-medium dark:text-gray-300">افزودن عکس</p>
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={memory.title}
                      src={memory.cover}
                      className="h-48 object-cover"
                    />
                  }
                  onClick={() => handleMemoryClick(memory.id)}
                >
                  <Card.Meta
                    title={memory.title}
                    description={
                      <>
                        <p className="text-sm font-medium">{memory.author}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {memory.description}
                        </p>
                      </>
                    }
                  />
                </Card>
              </List.Item>
            )}
          locale={{ emptyText: <EmptyState />, }}
        />
        <div className="flex justify-center mt-6 ltr">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={memories.length}
            onChange={(page) => setCurrentPage(page)}
            className="dark:text-white bg-gray-100 rounded-md"
          />
        </div>
      </div>

      <Modal
        title={<div className='w-full text-center p-4'>افزودن خاطره جدید</div>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddMemory}
        footer={null}
        className='p-2'
      >
        <div className="space-y-4 p-4">
          <Input
            placeholder="عنوان"
            value={newMemory.title}
            onChange={(e) => setNewMemory((prev) => ({ ...prev, title: e.target.value }))}
            className="mt-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <Input.TextArea
            placeholder="توضیحات"
            value={newMemory.description}
            onChange={(e) => setNewMemory((prev) => ({ ...prev, title: e.target.value }))}
            rows={4}
            className="mt-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setIsModalVisible(false)}
              className="px-6 py-2"
            >
              لغو
            </Button>
            <Button
              type="primary"
              onClick={handleAddMemory}
              className="px-6 py-2"
            >
              ثبت
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MemoriesPage;
