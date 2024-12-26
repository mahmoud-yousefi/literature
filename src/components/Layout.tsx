import { Button, ConfigProvider, Layout, Drawer, Menu, Dropdown, Avatar, Tooltip, Modal, Form, Input, notification, Upload } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState, useEffect } from 'react';
import SidebarMenu, { menuItems } from './SidebarMenu';
import { Content, Footer } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import { BookOutlined, MoonFilled, SunFilled, MenuOutlined, EditOutlined, LogoutOutlined, UserOutlined, LoginOutlined, UserAddOutlined, UploadOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

const AppLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [userAvatar, setUserAvatar] = useState(null);

  // Modal states
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const handleMenuClick = ({ key }: any) => {
    if (key === 'edit') {
      console.log('Edit Account');
    } else if (key === 'logout') {
      // setUserAvatar(null);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode === null) return;

    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => prev === false);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const location = useLocation();
  const activeMenuItem = menuItems.find(item => item.path === location.pathname);
  const headerTitle = activeMenuItem ? activeMenuItem.title : "صفحه اصلی";
  const HeaderIcon = activeMenuItem?.icon || BookOutlined;

  const handleSignup = () => {
    setIsSignupModalVisible(true);
  };

  const handleLogin = () => {
    setIsLoginModalVisible(true);
  };

  const handleSignupCancel = () => {
    setIsSignupModalVisible(false);
  };

  const handleLoginCancel = () => {
    setIsLoginModalVisible(false);
  };

  const signinOrSignupMenu = (
    <Menu>
      <Menu.Item key="1" icon={<LoginOutlined />} onClick={handleLogin}>
        ورود
      </Menu.Item>
      <Menu.Item key="2" icon={<UserAddOutlined />} onClick={() => {
        setFormHeader('ثبت‌نام');
        handleSignup();
      }}>
        ثبت‌نام
      </Menu.Item>
    </Menu>
  );

  const [formHeader, setFormHeader] = useState('ثبت‌نام');

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" onClick={() => {
        handleSignup();
        setFormHeader('ویرایش کاربر');
      }} icon={<EditOutlined />}>
        ویرایش حساب کاربری
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        خروج
      </Menu.Item>
    </Menu>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDarkMode ? '#1E40AF' : '#1D4ED8',
        },
      }}
    >
      <Layout className="min-h-screen" dir="rtl">
        {/* Signup Modal */}
        <Modal
          title={<div className='text-center pt-4'>{formHeader}</div>}
          visible={isSignupModalVisible}
          onCancel={handleSignupCancel}
          footer={null}
          width={300}
          centered
        >
          <Form
            layout="vertical"
            className='p-3'
            onFinish={() => {
              handleSignupCancel();
              notification.success({ message: 'ثبت‌نام با موفقیت انجام شد' });
            }}
          >
            <Form.Item name="username" rules={[{ required: true, message: 'لطفاً نام کاربری را وارد کنید' }]}>
              <Input placeholder="نام کاربری" />
            </Form.Item>

            <Form.Item name="email" rules={[{ required: true, message: 'لطفاً ایمیل را وارد کنید' }, { type: 'email', message: 'ایمیل معتبر وارد کنید' }]}>
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
                ثبت‌نام
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Login Modal */}
        <Modal
          title={<div className='text-center pt-4'>ورود</div>}
          visible={isLoginModalVisible}
          onCancel={handleLoginCancel}
          footer={null}
          width={300}
          centered
        >
          <Form
            layout="vertical"
            className='p-3'
            onFinish={() => {
              handleLoginCancel();
              notification.success({ message: 'ورود با موفقیت انجام شد' });
            }}
          >
            <Form.Item name="username" rules={[{ required: true, message: 'لطفاً نام کاربری را وارد کنید' }]}>
              <Input placeholder="نام کاربری" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'لطفاً رمز عبور را وارد کنید' }]}>
              <Input.Password placeholder="رمز عبور" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" block size="large" htmlType="submit">
                ورود
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="text" block onClick={() => {
                handleLoginCancel();
                handleSignup();
              }}>
                ثبت‌نام
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {isMobile ? (
          <Drawer
            closeIcon={false}
            placement="left"
            visible={drawerVisible}
            onClose={toggleDrawer}
            onClick={toggleDrawer}
            className='dark:!bg-blue-950 !bg-opacity-95 dark:!bg-opacity-95 !bg-blue-900'
            width={250}
          >
            <div className="m-4">
              <img
                src="https://cdn.tarhbama.com/1400/Image/2021/11/25/7/filelogo.jpg"
                alt="Logo"
                className="w-full rounded-full"
              />
            </div>
            <SidebarMenu />
          </Drawer>
        ) : (
          <Sider
            collapsible
            breakpoint="lg"
            collapsedWidth="80"
            className="bg-blue-900 dark:bg-blue-950"
          >
            <div className=''>
              <div className="m-4">
                <img
                  src="https://cdn.tarhbama.com/1400/Image/2021/11/25/7/filelogo.jpg"
                  alt="Logo"
                  className="w-full rounded-full"
                />
              </div>
              <SidebarMenu />
            </div>
          </Sider>
        )}

        <Layout>
          <HeaderComponent HeaderIcon={HeaderIcon} headerTitle={headerTitle} children={
            <div className='flex flex-wrap items-center w-full md:ml-20 lg:ml-52 justify-end p-3 z-50 gap-3'>
              <div className="flex items-center">
                <div className="block sm:hidden">
                  <Dropdown overlay={signinOrSignupMenu} trigger={['click']}>
                    <Button
                      type="text"
                      className="rounded-full p-1"
                      icon={<LockOutlined />}
                    />
                  </Dropdown>
                </div>
                <div className="hidden sm:flex space-x-2">
                  <Tooltip title="ورود" placement="bottom">
                    <Button
                      type="text"
                      className="rounded-full px-3 text-white"
                      icon={<LoginOutlined />}
                      onClick={handleLogin}
                    >
                      ورود
                    </Button>
                  </Tooltip>
                  <Tooltip title="ثبت‌نام" placement="bottom">
                    <Button
                      type="text"
                      className="rounded-full px-3 text-white"
                      icon={<UserAddOutlined />}
                      onClick={() => {
                        setFormHeader('ثبت‌نام');
                        handleSignup();
                      }}
                    >
                      ثبت‌نام
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
                <Button type='text' icon={<Avatar size={isMobile ? undefined : 45} icon={<UserOutlined />} />} className="cursor-pointer rounded-full" />
              </Dropdown>
              {
                isMobile ? (
                  <Button
                    type="text"
                    className="text-xl bg-blue-950 bg-opacity-30 text-xcolor5"
                    onClick={toggleDrawer}
                    icon={<MenuOutlined />}
                  />
                ) : null
              }
            </div>
          } />

          <Content
            className="px-6 py-20 bg-white dark:bg-gray-950 text-black dark:text-white"
          >
            <Outlet />
          </Content>

          <Footer className="fixed bottom-0 w-full bg-gray-800/50 dark:bg-gray-900/50 bg-red-300 bg-opacity-70 backdrop-blur-md text-white py-4 overflow-hidden px-2 shadow-lg border-t border-gray-700">
            <div className="absolute inset-0 -z-10">
              <div className="wave-animation bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 opacity-40 h-full"></div>
            </div>
            <div className="flex w-full gap-1 items-center z-10">
              <div className='flex justify-around w-full'>
                <p className="text-sm font-light">
                  کلیه حقوق محفوظ است &copy; {new Date().getFullYear()}
                </p>
                <a
                  href="https://mahmoud-yousefi.github.io/portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                >
                  وب سایت ما
                </a>
              </div>
              <Button
                type='text'
                className="p-3 rounded-full md:ml-20 lg:ml-52 text-xcolor5 shadow-md transition-transform transform hover:scale-110"
                onClick={toggleTheme}
              >
                {isDarkMode ? <SunFilled /> : <MoonFilled />}
              </Button>
            </div>
          </Footer>

        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
