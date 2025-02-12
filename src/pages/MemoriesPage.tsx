import React, { useEffect, useState } from 'react';
import { Input, List, Card, Button, notification, Pagination, Modal, Upload } from 'antd';
import EmptyState from '../components/EmptyState';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

export type LiteraryMemory = {
  id: string | number;
  title: string;
  content: string;
  date?: string;
  url: string;
};

const MemoriesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [memories, setMemories] = useState<(LiteraryMemory & { isAddCard?: boolean })[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMemory, setNewMemory] = useState<{
    title: string;
    content: string;
    date?: string;
    file?: File;
    previewUrl: string;
  }>({ title: '', content: '', previewUrl: '', date: '' }); const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 8;

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/memories',
        }); // Replace with your API endpoint
        setMemories(response.data); // Assuming the response data is an array of pictures
      } catch (err: any) {
        console.log(err?.message);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0,0);

    fetchMemories();
  }, []);

  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    const filteredPictures = memories.filter((memory) =>
      memory.title.includes(query) || memory.content.includes(query)
    );
    setMemories(filteredPictures);
    setCurrentPage(1);
    setLoading(false);
  };

  const handleAddMemory = async () => {
    if (newMemory.title && newMemory.file && newMemory.content) {
      try {
        const formData = new FormData();
        formData.append('title', newMemory.title);
        formData.append('content', newMemory.content || '');
        formData.append('file', newMemory.file);

        const response = await axiosInstance.post('/memories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const addedPicture = response.data;
        setMemories([...memories, addedPicture]);
        setNewMemory({ title: '', content: '', previewUrl: '', file: undefined });
        setIsModalVisible(false);
      } catch (error) {
        console.error('Error adding picture:', error);
        notification.error({ message: 'خطا در افزودن تصویر. لطفاً دوباره تلاش کنید.' });

        try {
          const response = await axiosInstance.get('/pictures');
          setMemories(response.data);
        } catch (fetchError) {
          console.error('Error fetching pictures:', fetchError);
          notification.error({ message: 'خطا در بارگذاری تصاویر. لطفاً دوباره تلاش کنید.' });
        }
      }
    } else {
      notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
    }
  };

  const handleMemoryClick = (id: number | string) => {
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
        <div className="flex w-full items-center mb-6">
          <Input
            placeholder="عنوان یا نام نویسنده را وارد کنید..."
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
          >
          </Button>
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
          dataSource={[...paginatedMemories, { id: 0, title: '', content: '', url: '', date: '', isAddCard: true }]}
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
                      src={memory.url}
                      className="h-48 object-cover"
                    />
                  }
                  className="dark:bg-gray-800"
                  onClick={() => handleMemoryClick(memory.id)}
                >
                  <Card.Meta
                    className="dark:text-white"
                    title={<span className="dark:text-white">{memory.title}</span>}
                    description={
                      <>
                        <p className="text-sm font-medium">{memory.date}</p>
                        <p className="dark:text-white line-clamp-2">
                          {memory.content}
                        </p>
                      </>
                    } />
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
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                notification.error({ message: "فقط تصاویر مجاز هستند." });
                return false;
              }

              const reader = new FileReader();
              reader.onload = () => {
                setNewMemory((prev) => ({
                  ...prev,
                  previewUrl: reader.result as string,
                  file
                }));
              };
              reader.readAsDataURL(file);
              return false;
            }}
            className="border-dashed border-2 border-gray-400 rounded-md p-2 flex items-center justify-center"
          >
            {newMemory.previewUrl ? (
              <div className="relative">
                <img
                  src={newMemory.previewUrl}
                  alt="آپلود"
                  className="h-32 w-32 object-cover rounded-md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewMemory((prev) => ({
                      ...prev,
                      previewUrl: '',
                      file: undefined
                    }));
                  }}
                  className="absolute top-0 right-0 text-white bg-black bg-opacity-50 p-1 rounded-full"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="text-center">
                <PlusOutlined className="text-4xl mb-2" />
                <div>افزودن تصویر</div>
              </div>
            )}
          </Upload>

          {/* <DatePicker /> */}

          <Input
            placeholder="عنوان"
            value={newMemory.title}
            onChange={(e) => setNewMemory((prev) => ({ ...prev, title: e.target.value }))}
            className="mt-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />

          <Input.TextArea
            placeholder="توضیحات"
            value={newMemory.content}
            onChange={(e) => setNewMemory((prev) => ({ ...prev, content: e.target.value }))}
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
