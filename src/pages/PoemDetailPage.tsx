import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Input, Button, List, Divider, Avatar, Collapse, Modal, notification, Tooltip, Image } from 'antd';
import { CoffeeOutlined, CopyOutlined, EditOutlined, HighlightOutlined, LeftOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import EmptyState from '../components/EmptyState';
import CarouselComponent from '../components/CarouselComponent';
import { slides } from '../utils';
import { Poem } from './PoemsPage';
import axiosInstance from '../api';

type UserComment = {
    author: string;
    content: string;
    date: string;
};

const PoemDetailPage: React.FC = () => {
    const { id } = useParams();
    const [poem, setPoem] = useState<Poem | null>(null);
    const [comments, setComments] = useState<UserComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
    const [isUnverifiedCommentsExpanded, setIsUnverifiedCommentsExpanded] = useState(false);
    const [isRelatedContentExpanded, setRelatedContentExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPoem, setNewPoem] = useState<Omit<Poem, 'id'>>({ title: '', content: '', url: '' });
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const fetchPicture = async () => {
            try {
                const response = await axiosInstance({
                    method: 'GET',
                    url: `/poems/${id}`, // Adjust the URL based on your API structure
                });
                const selectedPicture = response.data; // Assuming the response contains the picture data

                if (selectedPicture) {
                    setPoem(selectedPicture);
                    setNewPoem(selectedPicture);
                }
            } catch (error) {
                console.error('Error fetching picture:', error);
            }
        };

        window.scrollTo(0, 0);

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
        if (poem?.title && poem?.content && poem?.url && poem?.id) {
            if (!newPoem || !newPoem.title || !newPoem.content || !newPoem.url) {
                notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
                return;
            }

            setPoem((prev) => ({
                ...(prev as Poem),
                title: newPoem.title,
                content: newPoem.content,
                poet: newPoem.url,
            }));

            setIsModalVisible(false);
            notification.success({ message: 'لطفاً همه موارد را وارد کنید.' });
        } else {
            notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
        }
    };

    const handleCopy = async () => {
        try {
          if (poem?.content) {
            await navigator.clipboard.writeText(poem.content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000);
          } else {
            notification.error({ message: 'محتوای شعر برای کپی وجود ندارد.' });
          }
        } catch (err) {
          console.error('Failed to copy: ', err);
          notification.error({ message: 'خطا در کپی کردن محتوا.' });
        }
      };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            {!poem ? (
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

                    <h2 className="flex justify-center gap-2 text-2xl font-semibold text-gray-800 dark:text-white !mb-6 hover:text-blue-500 transition-colors">
                        <HighlightOutlined className="text-blue-500" />
                        {poem.title}
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-300 flex flex-col gap-2">
                        <div className='bg-gray-100 dark:bg-gray-700 text-center rounded-md pt-2 pb-6 px-6'>
                            <div className='flex justify-end w-full'><Button onClick={handleCopy} icon={isCopied ? <LoadingOutlined className='text-gray-900 dark:text-gray-100' /> : <CopyOutlined className='text-gray-900 dark:text-gray-100' />} className='text-gray-900 dark:!text-gray-100' type='text'>{isCopied ? 'کپی شد!' : undefined}</Button></div>
                            <div>{poem.content}</div>
                        </div>
                    </p>

                    <div className="flex justify-center my-6">
                        <Image
                            src={poem.url}
                            alt={poem.title}
                            className="object-cover w-full max-w-md h-auto shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                    </div>

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
                title={<div className='w-full text-center p-4'>ویرایش شعر</div>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleUpdate}
                footer={null}
                className='p-2'
            >
                <div className="space-y-4 p-4">
                    <Input
                        type="text"
                        placeholder="عتوان"
                        value={newPoem.title}
                        onChange={(e) => setNewPoem((prev) => ({ ...prev, title: e.target.value }))}
                    />

                    <Input
                        type="text"
                        placeholder="شاعر"
                        value={newPoem.url}
                        onChange={(e) => setNewPoem((prev) => ({ ...prev, poet: e.target.value }))}
                    />

                    <Input.TextArea
                        placeholder="توضیحات"
                        value={newPoem.content}
                        onChange={(e) => setNewPoem((prev) => ({ ...prev, content: e.target.value }))}
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

export default PoemDetailPage;
