import React, { useEffect, useState } from 'react';
import { Input, Button, List, Card, Modal, Upload, Pagination, notification, Image } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import axiosInstance from '../api';

export type Picture = {
  id: number;
  title: string;
  caption?: string;
  url: string;
};

const PicturesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState<(Picture & { isAddCard?: boolean })[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 8;

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/pictures',
        }); // Replace with your API endpoint
        setPictures(response.data); // Assuming the response data is an array of pictures
      } catch (err: any) {
        console.log(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, []);

  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    const filteredPictures = pictures.filter((picture) =>
      picture.title.includes(query)
    );
    setPictures(filteredPictures);
    setCurrentPage(1);
    setLoading(false);
  };
  const [newPicture, setNewPicture] = useState<{
    title: string;
    caption?: string;
    file?: File;
    previewUrl: string;
  }>({ title: '', caption: '', previewUrl: '' });

  // ... other code

  const handleAddPicture = async () => {
    if (newPicture.title && newPicture.file) {
      try {
        const formData = new FormData();
        formData.append('title', newPicture.title);
        formData.append('caption', newPicture.caption || '');
        formData.append('file', newPicture.file);

        const response = await axiosInstance.post('/pictures', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const addedPicture = response.data;
        setPictures([...pictures, addedPicture]);
        setNewPicture({ title: '', caption: '', previewUrl: '', file: undefined });
        setIsModalVisible(false);
      } catch (error) {
        console.error('Error adding picture:', error);
        notification.error({ message: 'خطا در افزودن تصویر. لطفاً دوباره تلاش کنید.' });

        try {
          const response = await axiosInstance.get('/pictures');
          setPictures(response.data);
        } catch (fetchError) {
          console.error('Error fetching pictures:', fetchError);
          notification.error({ message: 'خطا در بارگذاری تصاویر. لطفاً دوباره تلاش کنید.' });
        }
      }
    } else {
      notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
    }
  };

  const handlePictureClick = (id: number) => {
    navigate(`/pictures/${id}`);
  };

  const paginatedPictures = pictures.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-10 bg-gray-50 min-h-screen dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center pb-4 text-gray-900 dark:text-white">جستجوی عکس</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex w-full items-center">
            <Input
              placeholder="عنوان عکس را وارد کنید..."
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
        </div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
          }}
          loading={loading}
          dataSource={[...paginatedPictures, { id: 0, title: '', caption: '', url: '', isAddCard: true }]}
          renderItem={(picture) =>
            picture.isAddCard ? (
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
                    <Image
                      alt={picture.title}
                      src={picture.url}
                      className="!h-48 object-cover rounded-lg"
                    />
                  }
                  className="dark:bg-gray-800"
                  onClick={() => handlePictureClick(picture.id)}
                >
                  <Card.Meta
                    className="dark:text-white"
                    title={<span className="dark:text-white">{picture.title}</span>}
                    description={<span className="dark:text-white">{picture.caption}</span>}
                  />
                </Card>
              </List.Item>
            )
          }
          locale={{ emptyText: <EmptyState /> }}
        />
        <div className="flex justify-center mt-6 ltr">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={pictures.length}
            onChange={(page) => setCurrentPage(page)}
            className="dark:text-white bg-gray-100 rounded-md"
          />
        </div>
      </div>

      <Modal
        title={<div className='w-full text-center p-4'>افزودن عکس جدید</div>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddPicture}
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
                setNewPicture((prev) => ({
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
            {newPicture.previewUrl ? (
              <div className="relative">
                <img
                  src={newPicture.previewUrl}
                  alt="آپلود"
                  className="h-32 w-32 object-cover rounded-md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewPicture((prev) => ({
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
            placeholder="عنوان"
            value={newPicture.title}
            onChange={(e) => setNewPicture((prev) => ({ ...prev, title: e.target.value }))}
            className="mt-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />  

          <Input.TextArea
            placeholder="توضیحات"
            value={newPicture.caption}
            onChange={(e) => setNewPicture((prev) => ({ ...prev, caption: e.target.value }))}
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
              onClick={handleAddPicture}
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

export default PicturesPage;
