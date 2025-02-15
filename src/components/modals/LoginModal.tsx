import { Modal, Form, Input, Button, notification } from 'antd';
import axiosInstance from '../../api'; // Update path as needed
import { useState } from 'react';

interface LoginModalProps {
    visible: boolean;
    onCancel: () => void;
    setShowSignup: (show: boolean) => void;
    onSuccess: () => void;
}

export const LoginModal = ({ visible, onCancel, setShowSignup, onSuccess }: LoginModalProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { email: string; password: string }) => {
        let loginSuccessful = false;
        try {
            setLoading(true);
            const response = await axiosInstance.post('/auth/signin', {
                email: values.email,
                password: values.password
            });

            localStorage.setItem('token', response.data.access_token);
            notification.success({ message: 'ورود با موفقیت انجام شد' });
            loginSuccessful = true; // Mark login successful
        } catch (error) {
            console.log(error);
            notification.error({
                message: 'خطا در ورود',
                description: 'ایمیل یا رمز عبور نادرست است'
            });
        } finally {
            setLoading(false);
        }

        if (loginSuccessful) {
            try {
                onSuccess(); // Execute post-login actions
                onCancel();
                form.resetFields();
            } catch (e) {
                console.error('Error in post-login steps:', e);
                // Optionally show a different notification for post-login errors
            }
        }
    };

    return (
        <Modal
            title={<div className='text-center pt-4'>ورود</div>}
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={300}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                className='p-3'
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'لطفاً ایمیل را وارد کنید' },
                        { type: 'email', message: 'ایمیل معتبر وارد کنید' }
                    ]}
                >
                    <Input placeholder="ایمیل" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'لطفاً رمز عبور را وارد کنید' }]}
                >
                    <Input.Password placeholder="رمز عبور" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        block
                        size="large"
                        htmlType="submit"
                        loading={loading}
                    >
                        ورود
                    </Button>
                </Form.Item>

                <Form.Item className="mb-0">
                    <Button
                        type="text"
                        block
                        onClick={() => {
                            onCancel();
                            setShowSignup(true);
                        }}
                    >
                        ثبت‌نام
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};