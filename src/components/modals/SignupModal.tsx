import { Modal, Form, Input, Button, notification, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../api';
import { User } from '../../types';
import { message } from '../../utils/utils';

const SignupModal = ({
    visible,
    onCancel,
    formHeader,
    currentUser
}: {
    visible: boolean;
    onCancel: () => void;
    formHeader: string;
    currentUser: User | null;
}) => {

    return (
        <Modal
            title={<div className='text-center pt-4'>{formHeader}</div>}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={300}
            centered
        >
            <Form
                layout="vertical"
                className='p-3'
                onFinish={async (values) => {
                    try {
                        if (formHeader === 'ثبت‌نام') {
                            const response = await axiosInstance.post('/auth/signup', {
                                email: values.email,
                                password: values.password,
                                firstName: values.firstName,
                                lastName: values.lastName,
                            });
                            notification.success({ message: 'ثبت‌نام با موفقیت انجام شد' });
                            localStorage.setItem('token', response.data.access_token);
                        } else if (formHeader === 'ویرایش کاربر') {
                            await axiosInstance.put(`/users/${currentUser?.id}`, {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                password: values.password,
                            });
                            notification.success({ message: 'پروفایل با موفقیت به‌روزرسانی شد' });
                        }
                        onCancel();
                    } catch (error) {
                        console.error('Operation failed:', error);
                        notification.error({ message: 'خطا در انجام عملیات' });
                    }
                }}
            >
                <Form.Item name="firstName" rules={[{ required: true, message: message('نام') }]}>
                    <Input placeholder="نام" />
                </Form.Item>

                <Form.Item name="lastName" rules={[{ required: true, message: message("نام خانوادگی") }]}>
                    <Input placeholder="نام خانوادگی" />
                </Form.Item>

                <Form.Item name="email" rules={[{ required: true, message: message('ایمیل') }, { type: 'email', message: 'ایمیل معتبر وارد کنید' }]}>
                    <Input placeholder="ایمیل" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: 'لطفاً رمز عبور را وارد کنید' }]}>
                    <Input.Password placeholder="رمز عبور" />
                </Form.Item>

                <Form.Item name="confirmPassword" rules={[{ required: true, message: 'لطفاً تکرار رمز عبور را وارد کنید' }]}>
                    <Input.Password placeholder="تکرار رمز عبور" />
                </Form.Item>

                <Form.Item label="آپلود عکس پروفایل" name="avatar" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
                    <Upload
                        name="avatar"
                        action="/upload" // Set your upload endpoint here
                        listType="picture"
                        showUploadList={{ showRemoveIcon: true }}
                        beforeUpload={(file) => {
                            const isImage = file.type.startsWith('image/');
                            if (!isImage) {
                                notification.error({ message: 'لطفاً یک فایل تصویری آپلود کنید' });
                            }
                            return isImage;
                        }}
                        onChange={({ file, /* fileList */ }) => {
                            if (file.status === 'done') {
                                notification.success({ message: `${file.name} فایل با موفقیت آپلود شد` });
                            } else if (file.status === 'error') {
                                notification.error({ message: `${file.name} آپلود ناموفق بود` });
                            }
                        }}
                    >
                        <Button icon={<UploadOutlined />} block>آپلود عکس</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" block size="large" htmlType="submit" style={{ backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' }}>
                        {formHeader}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default SignupModal;