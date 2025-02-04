import React, { useState } from 'react';
import { Input, List, Card, Button, Modal, Pagination, notification } from 'antd';
import EmptyState from '../components/EmptyState';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { mockPoems } from '../utils';
import { useNavigate } from 'react-router-dom';

// Mock data for poems
export type Poem = {
  id: number;
  title: string;
  poet: string;
  content: string;
};

const PoemsPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [poems, setPoems] = useState<(Poem & { isAddCard?: boolean })[]>(mockPoems);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPoem, setNewPoem] = useState<{ title: string; poet: string; content: string }>({ title: '', content: '', poet: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleSearch = () => {
    const filteredPoems = mockPoems.filter(
      (poem) =>
        poem.title.includes(query) ||
        poem.poet.includes(query) ||
        poem.content.includes(query)
    );
    setPoems(filteredPoems);
    setCurrentPage(1);
  };

  const handleAddPoem = () => {
    if (newPoem.title && newPoem.content) {
      const newId = poems.length ? poems[poems.length - 1].id + 1 : 1;
      setPoems([...poems, { id: newId, title: newPoem.title, poet: newPoem.poet, content: newPoem.content }]);
      setNewPoem({ title: '', content: '', poet: '' });
      setIsModalVisible(false);
    } else {
      notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
    }
  };

  React.useEffect(() => {
    if (!query) handleSearch();
  }, [query]);

  const navigate = useNavigate();

  const handlePictureClick = (id: number) => {
    navigate(`/poems/${id}`);
  };

  const paginatedPoems = poems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-10 bg-gray-50 min-h-screen dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold !mb-4 text-center text-gray-900 dark:text-white">لیست اشعار</h1>
        <div className="flex items-center mb-6">
          <Input
            placeholder="جستجو بر اساس عنوان، شاعر یا متن شعر..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={handleSearch}
            className="w-full dark:bg-gray-700 dark:text-white dark:placeholder:text-white rounded-l-none"
          />
          <Button
            type="primary"
            onClick={handleSearch}
            className="!ml-2 h-full rounded-r-none p-2"
            icon={<SearchOutlined />}
          />
        </div>

        <List
          dataSource={[...paginatedPoems, { id: 0, title: '', poet: '', content: '', isAddCard: true }]}
          renderItem={(poem) => (
            poem.isAddCard ? (
              <List.Item>
                <Card
                  hoverable
                  className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  onClick={() => setIsModalVisible(true)}
                >
                  <div className="bg-gray-100 rounded-full p-6 flex items-center justify-center mb-4 dark:bg-gray-700">
                    <PlusOutlined className="text-4xl text-gray-500 dark:text-white" />
                  </div>
                  <p className="text-gray-600 font-medium dark:text-gray-300">افزودن شعر</p>
                </Card>
              </List.Item>
            )
              :
              <List.Item>
                <Card
                  hoverable
                  onClick={() => handlePictureClick(poem.id)}
                  className='dark:bg-gray-800 dark:hover:shadow-lg dark:hover:shadow-white'
                >
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{poem.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{poem.poet}</p>
                  <p className="text-gray-500 dark:text-gray-400">{poem.content}</p>
                </Card>
              </List.Item>
          )}
          locale={{ emptyText: <EmptyState /> }}
        />

        <div className="flex justify-center mt-6 ltr">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={poems.length}
            onChange={(page) => setCurrentPage(page)}
            className="dark:text-white bg-gray-100 rounded-md"
          />
        </div>
      </div>

      <Modal
        title={<div className='w-full text-center p-4'>افزودن شعر جدید</div>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddPoem}
        footer={null}
        className='p-2'
      >
        <div className="space-y-2 p-4">
          <Input
            placeholder="عنوان شعر"
            value={newPoem.title}
            onChange={(e) => setNewPoem((prev) => ({ ...prev, title: e.target.value }))}
            className="mb-4"
          />
          <Input
            placeholder="شاعر"
            value={newPoem.poet}
            onChange={(e) => setNewPoem((prev) => ({ ...prev, poet: e.target.value }))}
            className="mb-4"
          />
          <Input.TextArea
            placeholder="توضیحات"
            value={newPoem.content}
            onChange={(e) => setNewPoem((prev) => ({ ...prev, content: e.target.value }))}
            rows={4}
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
              onClick={handleAddPoem}
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

export default PoemsPage;
