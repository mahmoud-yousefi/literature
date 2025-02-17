import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../api';
import type { User } from '../../types';

interface UserFormProps {
  mode: 'signup' | 'edit';
  user?: User;
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ mode, user, onSuccess, onCancel, visible }) => {
  const [form] = Form.useForm();
  const [previewAvatar, setPreviewAvatar] = useState<string>(user?.avatar || '');
  const [file, setFile] = useState<File>();

  // useEffect(() => {
  //   if (user) {
  //     form.setFieldsValue(user);
  //     setPreviewAvatar(user.avatar || '');
  //   }

  // }, []);

  //   useEffect(() => {
  //     setNewData({
  //       ...user,
  //       previewUrl: user?.avatar ?? '',
  //     })

  //     window.scrollTo(0, 0);
  // }, [user]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
      setPreviewAvatar(user.avatar || '');
    }

  }, [user, form]);


  // UserForm.tsx (fixed parts)
  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      // Required fields
      formData.append('firstName', values.firstName || '');
      formData.append('lastName', values.lastName || '');
      formData.append('email', values.email || '');

      // Conditional fields
      if (values.password) {
        formData.append('password', values.password);
      }
      if (values.hash) {
        formData.append('hash', values.hash);
      }
      if (file) {
        formData.append('file', file); // Changed from 'avatar' to 'file'
      }

      if (mode === 'signup') {
        const response = await axiosInstance.post('/auth/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        localStorage.setItem('token', response.data.access_token);
        notification.success({ message: 'ثبت‌نام موفقیت آمیز بود' });
      } else if (user?.id) {
        await axiosInstance.put(`/users/${user.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        notification.success({ message: 'پروفایل با موفقیت به روزرسانی شد' });
      }

      onSuccess();
      handleReset();
    } catch (error) {
      console.log(error);
      notification.error({ message: 'خطا در انجام عملیات' });
    }
  };

  const handleReset = () => {
    setPreviewAvatar('');
    setFile(undefined);
    onCancel();
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      notification.error({ message: 'فقط فایل‌های تصویری مجاز هستند' });
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => setPreviewAvatar(reader.result as string);
    reader.readAsDataURL(file);
    setFile(file);
    return false;
  };

  return (
    <Modal
      title={<div className='w-full pt-2 text-center'>{mode === 'signup' ? 'ثبت‌نام' : 'ویرایش پروفایل'}</div>}
      open={visible}
      onCancel={handleReset}
      footer={null}
      centered
      width={300}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className='p-3 pt-0'>
        <Form.Item label="آواتار">
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {previewAvatar ? (
              <div className="relative">
                <img
                  src={previewAvatar}
                  alt="avatar"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <Button
                  shape="circle"
                  danger
                  className="absolute top-0 left-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewAvatar('');
                    setFile(undefined);
                  }}
                >
                  ×
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <UploadOutlined className="text-2xl" />
                <div>آپلود تصویر</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="firstName"
          label="نام"
          rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید' }]}
        >
          <Input prefix={<UserOutlined />} name='firstName' />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="نام خانوادگی"
          rules={[{ required: true, message: 'لطفاً نام خانوادگی خود را وارد کنید' }]}
        >
          <Input prefix={<UserOutlined />} name='lastName' />
        </Form.Item>

        <Form.Item
          name="email"
          label="ایمیل"
          rules={[
            { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
            { type: 'email', message: 'ایمیل معتبر وارد کنید' }
          ]}
        >
          <Input prefix={<MailOutlined />} name='email' />
        </Form.Item>
        
        <Form.Item
          name={mode === 'signup' ? "password" : "hash"}
          label={mode === 'signup' ? "رمز عبور" : "رمز عبور جدید"}
          rules={[
            // Required only in signup mode
            mode === 'signup' ? {
              required: true,
              message: 'لطفاً رمز عبور را وارد کنید'
            } : {}
          ]}
        >
          <Input.Password prefix={<LockOutlined />} name={mode === 'signup' ? "password" : "hash"} />
        </Form.Item>

        <Form.Item
          name="confirmHash"
          label="تکرار رمز عبور"
          dependencies={[mode === 'signup' ? "password" : "hash"]}
          rules={[
            // Required only if password is filled
            ({ getFieldValue }) => ({
              required: !!getFieldValue(mode === 'signup' ? "password" : "hash"),
              message: 'لطفاً تکرار رمز عبور را وارد کنید',
            }),
            ({ getFieldValue }) => ({
              validator(_, value) {
                // Only validate if password has value
                if (!value && !getFieldValue(mode === 'signup' ? "password" : "hash")) {
                  return Promise.resolve();
                }
                if (getFieldValue(mode === 'signup' ? "password" : "hash") === value) {
                  return Promise.resolve();
                }
                return Promise.reject('رمزهای عبور وارد شده مطابقت ندارند');
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} name={mode === 'signup' ? "confirmPassword" : "confirmHash"} />
        </Form.Item>

        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={handleReset}>لغو</Button>
          <Button type="primary" htmlType="submit">
            {mode === 'signup' ? 'ثبت‌نام' : 'ذخیره تغییرات'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserForm;