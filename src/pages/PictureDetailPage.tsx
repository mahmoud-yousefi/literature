import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Input, Button, List, Divider, Avatar, Collapse, Modal, notification, Upload, Tooltip } from 'antd';
import { CoffeeOutlined, EditOutlined, LeftOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import EmptyState from '../components/EmptyState';
import { mockPictures } from './PicturesPage';
import CarouselComponent from '../components/CarouselComponent';
import { slides } from '../utils';

type Picture = {
    id: string | number;
    title: string;
    author: string;
    cover: string;
};

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
    const [isUnverifiedCommentsExpanded, setIsUnverifiedCommentsExpanded] = useState(false);
    const [isRelatedContentExpanded, setRelatedContentExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPicture, setNewPicture] = useState<{ title: string; cover: string }>({ title: '', cover: '' });

    useEffect(() => {
        const selectedPicture = mockPictures.find((p) => p.id === Number(id));
        if (selectedPicture) {
            setPicture(selectedPicture);
            setNewPicture(selectedPicture);
        }
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
        }
    };

    const toggleCommentsVisibility = () => {
        setIsCommentsExpanded((prevState) => !prevState);
    };

    const toggleUnverifiedCommentsVisibility = () => {
        setIsUnverifiedCommentsExpanded((prevState) => !prevState);
    };

    const toggleRelatedContentVisibility = () => {
        setRelatedContentExpanded((prevState) => !prevState);
    };

    const handleUpdate = () => {
        if (picture?.title && picture?.cover && picture?.id) {
            if (!newPicture || !newPicture.title || !newPicture.cover) {
                notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
                return;
            }

            setPicture((prev) => ({
                ...(prev as Picture),
                title: newPicture.title,
                author: 'ناشناس',
                cover: newPicture.cover,
            }));

            setIsModalVisible(false);
            notification.success({ message: 'لطفاً همه موارد را وارد کنید.' });
        } else {
            notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
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

                    {/* Image Section */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={picture.cover}
                            alt={picture.title}
                            className="rounded-lg object-cover w-full max-w-md h-auto shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4 hover:text-blue-500 transition-colors">
                        {picture.title}
                    </h2>

                    <p className="text-lg text-center text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                        <UserOutlined className="text-blue-500" />
                        <strong>نویسنده:</strong> {picture.author}
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
                            expandIcon={({ isActive }) => <LeftOutlined rotate={isActive ? 90 : 0} className='dark:!text-white dark:!font-bold' />}
                        >
                            <Collapse.Panel
                                key="comments"
                                header={
                                    <Button
                                        type="link"
                                        className="dark:text-white font-bold"
                                    >
                                        {isCommentsExpanded ? 'پنهان کردن نظرات' : 'نمایش نظرات'}
                                    </Button>
                                }
                            >
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                        نظرات <CoffeeOutlined />
                                    </h3>
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
                            expandIcon={({ isActive }) => <LeftOutlined rotate={isActive ? 90 : 0} className='dark:!text-white dark:!font-bold' />}
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

                        <Collapse
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
                        </Collapse>
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
                                setNewPicture((prev) => ({ ...prev, cover: reader.result as string }));
                            };
                            reader.readAsDataURL(file);
                            return false;
                        }}
                        className="border-dashed border-2 border-gray-400 rounded-md p-2 flex items-center justify-center"
                    >
                        {newPicture.cover ? (
                            <div className="relative">
                                <img
                                    src={newPicture.cover}
                                    alt="upload"
                                    className="h-32 w-32 object-cover rounded-md"
                                />
                                <button
                                    onClick={() => setNewPicture((prev) => ({ ...prev, cover: "" }))}
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

                    <Input.TextArea
                        placeholder="توضیحات"
                        value={newPicture.title}
                        onChange={(e) => setNewPicture((prev) => ({ ...prev, title: e.target.value }))}
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
