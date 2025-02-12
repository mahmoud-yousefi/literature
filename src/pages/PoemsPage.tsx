import React, { useEffect, useState } from 'react';
import { Input, List, Card, Button, Modal, Pagination, notification, Upload } from 'antd';
import EmptyState from '../components/EmptyState';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

// Mock data for poems
export type Poem = {
  id: number;
  title: string;
  content: string;
  url?: string;
};

const PoemsPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [poems, setPoems] = useState<(Poem & { isAddCard?: boolean })[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPoem, setNewPoem] = useState<{
    title: string;
    content: string;
    file?: File;
    previewUrl: string;
  }>({ title: '', content: '', previewUrl: '' }); const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/poems',
        }); // Replace with your API endpoint
        setPoems(response.data); // Assuming the response data is an array of pictures
      } catch (err: any) {
        console.log(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const handleSearch = async () => {
    const filteredPoems = poems.filter(
      (poem: Poem) =>
        poem.title.toLowerCase().includes(query.toLowerCase()) ||
        poem.content.toLowerCase().includes(query.toLowerCase())
    );

    setPoems(filteredPoems);
    setCurrentPage(1);
  };

  const handleAddPoem = async () => {
    if (newPoem.title && newPoem.file && newPoem.content) {
      try {
        const formData = new FormData();
        formData.append('title', newPoem.title);
        formData.append('content', newPoem.content || '');
        formData.append('file', newPoem.file);

        const response = await axiosInstance.post('/poems', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const addedPoem = response.data;
        setPoems([...poems, addedPoem]);
        setNewPoem({ title: '', content: '', previewUrl: '', file: undefined });
        setIsModalVisible(false);
      } catch (error) {
        console.error('Error adding picture:', error);
        notification.error({ message: 'خطا در افزودن تصویر. لطفاً دوباره تلاش کنید.' });

        try {
          const response = await axiosInstance.get('/pictures');
          setPoems(response.data);
        } catch (fetchError) {
          console.error('Error fetching pictures:', fetchError);
          notification.error({ message: 'خطا در بارگذاری اشعار. لطفاً دوباره تلاش کنید.' });
        }
      }
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
          loading={loading}
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
                setNewPoem((prev) => ({
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
            {newPoem.previewUrl ? (
              <div className="relative">
                <img
                  src={newPoem.previewUrl}
                  alt="آپلود"
                  className="h-32 w-32 object-cover rounded-md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewPoem((prev) => ({
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
          <Input
            placeholder="عنوان شعر"
            value={newPoem.title}
            onChange={(e) => setNewPoem((prev) => ({ ...prev, title: e.target.value }))}
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
