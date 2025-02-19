import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Input, Button, List, Divider, Avatar, Collapse, Modal, notification, Upload, Tooltip, Image } from 'antd';
import { CoffeeOutlined, DeleteOutlined, EditOutlined, PlusOutlined, RightOutlined, SignatureOutlined, UserOutlined } from '@ant-design/icons';
import EmptyState from '../components/EmptyState';
import { Picture } from './PicturesPage';
import CarouselComponent from '../components/CarouselComponent';
import { slides } from '../utils';
import axiosInstance from '../api';

type UserComment = {
    author: string;
    content: string;
    date: string;
};

const PictureDetailPage: React.FC = () => {
    const { id } = useParams();
    const [picture, setPicture] = useState<Picture | null>(null);
    const [comments, setComments] = useState<UserComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
    // const [isUnverifiedCommentsExpanded, setIsUnverifiedCommentsExpanded] = useState(false);
    const [isRelatedContentExpanded, setRelatedContentExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPicture, setNewPicture] = useState<{
        title: string;
        caption?: string;
        file?: File;
        previewUrl: string;
    }>({ title: '', caption: '', previewUrl: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPicture = async () => {
            try {
                const response = await axiosInstance.get(`/pictures/${id}`);
                const selectedPicture = response.data;

                setPicture(selectedPicture);
                setNewPicture({
                    title: selectedPicture.title,
                    caption: selectedPicture.caption,
                    previewUrl: selectedPicture.url
                });
            } catch (error) {
                console.error('Error fetching picture:', error);
            }
        };
        fetchPicture();
    }, [id]);

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const newCommentData: UserComment = {
                author: 'کاربر ناشناس',
                content: newComment,
                date: new Date().toLocaleString(),
            };
            setComments([...comments, newCommentData]);
            setNewComment('');
            setIsCommentsExpanded(true);
        }
    };

    const toggleCommentsVisibility = () => {
        setIsCommentsExpanded((prevState) => !prevState);
    };

    // const toggleUnverifiedCommentsVisibility = () => {
    //     setIsUnverifiedCommentsExpanded((prevState) => !prevState);
    // };

    const toggleRelatedContentVisibility = () => {
        setRelatedContentExpanded((prevState) => !prevState);
    };

    const handleUpdate = async () => {
        if (!newPicture.title || !newPicture.previewUrl) {
            notification.error({ message: 'لطفاً عنوان و تصویر را وارد کنید.' });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', newPicture.title);
            formData.append('caption', newPicture.caption || '');

            // Only append file if it exists, otherwise use existing URL
            if (newPicture.file) {
                formData.append('file', newPicture.file);
            } else {
                formData.append('url', newPicture.previewUrl);
            }

            await axiosInstance.put(`/pictures/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            notification.success({ message: 'تصویر با موفقیت به‌روزرسانی شد!' });
            setIsModalVisible(false);
            setPicture({ title: newPicture.title, caption: newPicture.caption, url: newPicture.previewUrl, id: id ?? '' });
        } catch (error) {
            console.error('Error updating picture:', error);
            notification.error({ message: 'خطا در به‌روزرسانی تصویر. لطفاً دوباره تلاش کنید.' });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            {!picture ? (
                <Spin size="large" tip="Loading..." className="text-blue-500" />
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl p-6 transition-all duration-300 hover:scale-105">
                    <Tooltip title="ویرایش">
                        <Button
                            type="text"
                            className="p-2 my-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
                            icon={
                                <EditOutlined className="text-gray-700 dark:text-white text-2xl md:text-4xl" />
                            }
                            onClick={() => setIsModalVisible(true)}
                        />
                    </Tooltip>

                    <Tooltip title="حذف">
                        <Button
                            type="text"
                            className="p-2 m-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
                            icon={
                                <DeleteOutlined className="text-gray-700 dark:text-white text-2xl md:text-4xl" />
                            }
                            onClick={() =>
                                Modal.confirm({
                                    title: 'حذف تصویر',
                                    content: 'آیا از حذف این تصویر مطمئن هستید؟',
                                    okText: 'حذف',
                                    okType: 'danger',
                                    cancelText: 'لغو',
                                    onOk: async () => {
                                        try {
                                            await axiosInstance({
                                                method: 'DELETE',
                                                url: `/pictures/${picture.id}`,
                                            });
                                            notification.success({ message: 'تصویر با موفقیت حذف شد!' });
                                        } catch (error) {
                                            console.error('Error deleting picture:', error);
                                            notification.error({ message: 'حذف تصویر با شکست مواجه شد، لطفاً دوباره تلاش کنید.' });
                                        } finally {
                                            navigate('/pictures');
                                        }
                                    },
                                })
                            }
                        />
                    </Tooltip>

                    {/* Image Section */}
                    <div className="flex justify-center mb-6">
                        <Image
                            src={picture.url}
                            alt={picture.title}
                            className="rounded-lg object-cover w-full max-w-md h-auto shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4 hover:text-blue-500 transition-colors">
                        {picture.title}
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-300 whitespace-pre">
                        <SignatureOutlined className="text-blue-500" />
                        <br />
                        {picture.caption}
                    </p>

                    <Divider className="border-y-2 mt-6 dark:border-gray-600" />

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white !mb-4">افزودن نظر</h3>
                        <Input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="نظر خود را بنویسید..."
                            className="mb-4 dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
                        />
                        <Button type="primary" onClick={handleCommentSubmit} block>
                            ثبت نظر
                        </Button>

                        <Divider className='mt-8' />

                        <Collapse
                            expandIconPosition="start"
                            activeKey={isCommentsExpanded ? ['comments'] : []}
                            onChange={() => toggleCommentsVisibility()}
                            ghost
                            expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} className='dark:!text-white dark:!font-bold' />}
                        >
                            <Collapse.Panel
                                key="comments"
                                header={
                                    <Button
                                        type="link"
                                        className="dark:text-white font-bold"
                                    >
                                        {isCommentsExpanded ? 'پنهان کردن نظرات' : 'نمایش نظرات'}
                                        <CoffeeOutlined />
                                    </Button>
                                }
                            >
                                <div className="mt-8">
                                    <List
                                        itemLayout="vertical"
                                        dataSource={comments}
                                        renderItem={(comment) => (
                                            <List.Item key={comment.date} className="border-b border-gray-200 dark:border-gray-700 py-4">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar icon={<UserOutlined />} />
                                                        <strong className="text-sm md:text-base dark:text-gray-300">{comment.author}</strong>
                                                    </div>
                                                    <p className="text-sm md:text-base dark:text-white flex-1 w-full break-words">{comment.content}</p>
                                                    <span className="text-xs md:text-sm text-gray-400">{comment.date}</span>
                                                </div>
                                            </List.Item>
                                        )}
                                        locale={{ emptyText: <EmptyState /> }}
                                    />
                                </div>
                            </Collapse.Panel>
                        </Collapse>

                        <Collapse
                            className="mt-4"
                            expandIconPosition="start"
                            activeKey={isRelatedContentExpanded ? ['relatedContents'] : []}
                            onChange={() => toggleRelatedContentVisibility()}
                            ghost
                            expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} className='dark:!text-white dark:!font-bold' />}
                        >
                            <Collapse.Panel
                                key="relatedContents"
                                header={
                                    <Button
                                        type="link"
                                        className="dark:text-white font-bold"
                                    >
                                        محتوای مرتبط
                                    </Button>
                                }
                            >
                                <div className="flex flex-col max-w-screen-md mx-auto mt-5">
                                    <CarouselComponent slides={slides} featureCardClassName="h-[15rem]" />
                                </div>
                            </Collapse.Panel>
                        </Collapse>

                        {/* <Collapse
                            className="mt-4"
                            expandIconPosition="start"
                            activeKey={isUnverifiedCommentsExpanded ? ['unverifiedComments'] : []}
                            onChange={() => toggleUnverifiedCommentsVisibility()}
                            ghost
                            expandIcon={({ isActive }) => <LeftOutlined rotate={isActive ? 90 : 0} className='dark:!text-white dark:!font-bold' />}
                        >
                            <Collapse.Panel
                                key="unverifiedComments"
                                header={
                                    <Button
                                        type="link"
                                        className="dark:text-white font-bold"
                                    >
                                        نطرات تایید نشده
                                    </Button>
                                }
                            >
                                <List
                                    itemLayout="vertical"
                                    dataSource={[] as UserComment[]}
                                    renderItem={(comment) => (
                                        <List.Item key={comment.date} className="border-b border-gray-200 dark:border-gray-700 py-4">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap">
                                                <div className="flex items-center gap-2">
                                                    <Avatar icon={<UserOutlined />} />
                                                    <strong className="text-sm md:text-base dark:text-gray-300">{comment.author}</strong>
                                                </div>
                                                <p className="text-sm md:text-base dark:text-white flex-1 w-full break-words">{comment.content}</p>
                                                <span className="text-xs md:text-sm text-gray-400">{comment.date}</span>
                                            </div>
                                        </List.Item>
                                    )}
                                    locale={{ emptyText: <EmptyState /> }}
                                />
                            </Collapse.Panel>
                        </Collapse> */}
                    </div>
                </div>
            )}

            <Modal
                title={<div className='w-full text-center p-4'>ویرایش عکس</div>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleUpdate}
                footer={null}
                className='p-2'
            >
                <div className="space-y-4 p-4">
                    <div className='flex justify-center'>
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={(file) => {
                                const isImage = file.type.startsWith("image/");
                                if (!isImage) {
                                    notification.error({ message: "فقط تصاویر مجاز هستند." });
                                    return false;
                                }

                                setNewPicture(prev => ({
                                    ...prev,
                                    file: file,
                                    previewUrl: URL.createObjectURL(file)
                                }));
                                return false;
                            }}
                        >
                            {newPicture.previewUrl ? (
                                <div className="relative">
                                    <img
                                        src={newPicture.previewUrl}
                                        alt="preview"
                                        className="h-32 w-32 object-cover rounded-md"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setNewPicture(prev => ({
                                                ...prev,
                                                file: undefined,
                                                previewUrl: ''
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
                    </div>

                    <Input
                        type="text"
                        placeholder="عنوان"
                        value={newPicture.title}
                        onChange={(e) => setNewPicture((prev) => ({ ...prev, title: e.target.value }))}
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
                            onClick={handleUpdate}
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

export default PictureDetailPage;
