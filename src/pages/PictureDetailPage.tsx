import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Input, Button, List, Divider, Avatar, Collapse } from 'antd';
import { CoffeeOutlined, LeftOutlined, UserOutlined } from '@ant-design/icons';
import EmptyState from '../components/EmptyState';
import { mockPictures } from './PicturesPage';
import CarouselComponent from '../components/CarouselComponent';
import { slides } from '../utils';

type Picture = {
    id: number;
    title: string;
    author: string;
    cover: string;
};

type Comment = {
    author: string;
    content: string;
    date: string;
};

const PictureDetailPage: React.FC = () => {
    const { id } = useParams();
    const [picture, setPicture] = useState<Picture | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
    const [isRelatedContentExpanded, setRelatedContentExpanded] = useState(false);

    useEffect(() => {
        const selectedPicture = mockPictures.find((p) => p.id === Number(id));
        if (selectedPicture) {
            setPicture(selectedPicture);
        }
    }, [id]);

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const newCommentData: Comment = {
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

    const toggleRelatedContentVisibility = () => {
        setRelatedContentExpanded((prevState) => !prevState);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            {!picture ? (
                <Spin size="large" tip="Loading..." className="text-blue-500" />
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl p-6 transition-all duration-300 hover:scale-105">
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default PictureDetailPage;
