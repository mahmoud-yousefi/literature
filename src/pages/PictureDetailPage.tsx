import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockPictures } from './PicturesPage';
import { Spin, Input, Button, List, Divider, Avatar } from 'antd';
import { CoffeeOutlined, UserOutlined } from '@ant-design/icons';
import EmptyState from '../components/EmptyState';

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
    const [comments, setComments] = useState<Comment[]>([]); // State for comments
    const [newComment, setNewComment] = useState(''); // State for new comment input

    useEffect(() => {
        const selectedPicture = mockPictures.find((p) => p.id === Number(id));
        if (selectedPicture) {
            setPicture(selectedPicture);
        }
    }, [id]);

    // Handle comment submission
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

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            {
                !picture ? (
                    <Spin size="large" tip="Loading..." className="text-blue-500" />
                ) : (
                    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-3xl p-8 transform transition-all duration-500 hover:scale-105">
                        <div className="flex justify-center mb-8">
                            <img
                                src={picture.cover}
                                alt={picture.title}
                                className="rounded-xl object-cover w-full max-w-lg h-auto shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4 text-center transition-all duration-300 hover:text-blue-500">
                            {picture.title}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-4 flex justify-center gap-2">
                            <UserOutlined className="mr-2 text-blue-500" />
                            <strong className="font-medium">نویسنده:</strong> {picture.author}
                        </p>

                        <Divider className='border-y-2 mt-20 dark:border-gray-500' />

                        {/* Comment Section */}
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white !mb-5">افزودن نظر</h3>
                            <Input
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="نظر خود را بنویسید..."
                                className="mb-4 dark:bg-gray-700 dark:placeholder:text-gray-50 dark:text-gray-50"
                            />
                            <Button type="primary" onClick={handleCommentSubmit} block>
                                ثبت نظر
                            </Button>

                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex gap-1">نظرات <CoffeeOutlined /></h3>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    dataSource={comments}
                                    renderItem={(comment) => (
                                        <List.Item key={comment.date}>
                                            <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2 ltr justify-end">
                                                <p className="text-md dark:text-white !mx-5">{comment.content}</p>
                                                <strong>{comment.author}</strong> | <span className="text-sm text-gray-400">{comment.date}</span>
                                                <Avatar icon={<UserOutlined />} />
                                            </div>
                                        </List.Item>
                                    )}
                                    locale={{ emptyText: <EmptyState />, }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default PictureDetailPage;
