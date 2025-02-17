import { Button, ConfigProvider, Layout, Menu, Dropdown, Avatar, Tooltip, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { menuItems } from './SidebarMenu';
import { Content, Footer } from 'antd/es/layout/layout';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { MoonFilled, SunFilled, MenuOutlined, EditOutlined, LogoutOutlined, UserOutlined, LoginOutlined, UserAddOutlined, LockOutlined, LinkOutlined } from '@ant-design/icons';
import HeaderComponent from './HeaderComponent';
import { Picture } from '../pages/PicturesPage';
import { Poem } from '../pages/PoemsPage';
import { LiteraryMemory } from '../pages/MemoriesPage';
import axiosInstance from '../api';
import { User } from '../types';
import { LoginModal } from './modals/LoginModal';
import Sidebar from './Sidebar';
import UserForm from './modals/UserForm';

const AppLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [userAvatar, setUserAvatar] = useState(null);

  // Modal states
  const [showSignup, setShowSignup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

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

  const { id } = useParams();
  const location = useLocation();
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const activeMenuItem = menuItems.find(item => item.path === location.pathname);

  useEffect(() => {
    const fetchHeaderTitle = async () => {
      if (activeMenuItem) {
        setHeaderTitle(activeMenuItem.title);
        return;
      }

      let selectedCard: Picture | Poem | LiteraryMemory | undefined;

      for (const item of menuItems) {
        if (location.pathname.includes(item.path) && item.path !== '/') {
          try {
            const response = await axiosInstance({
              method: 'GET',
              url: `${item.path}/${id}`,
            });
            selectedCard = response.data; // Assuming the response contains the card data
            break; // Exit the loop once we find the matching item
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      }

      setHeaderTitle(`جزئیات ${selectedCard?.title || ''}`);
    };

    fetchHeaderTitle();
  }, [activeMenuItem, menuItems, location.pathname, id]);

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await axiosInstance.get('/users/me');
          setCurrentUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    if(!currentUser) fetchCurrentUser();
  }, [localStorage.getItem('token'), currentUser]);

  const HeaderIcon = activeMenuItem?.icon || menuItems.find((item) => location.pathname.includes(item.path) && item.path !== '/')?.icon;

  const handleLogin = () => {
    setIsLoginModalVisible(true);
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
        setShowSignup(true);
      }}>
        ثبت‌نام
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={() => {
        setShowEdit(true);
      }} icon={<EditOutlined />}>
        ویرایش حساب کاربری
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => {
        localStorage.removeItem('token');
        setCurrentUser(undefined);
        notification.success({message: 'خروج با موفقیت انجام شد'});
      }} >
        خروج
      </Menu.Item>
    </Menu>
  );

  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDarkMode ? '#1E40AF' : '#1D4ED8',
        },
      }}
    >
      <Layout className="min-h-screen dark:bg-gray-900" dir="rtl">
        <UserForm
          mode="signup"
          visible={showSignup}
          onCancel={() => setShowSignup(false)}
          onSuccess={() => {
            setShowSignup(false);
          }}
        />

        <UserForm
          mode="edit"
          user={currentUser}
          visible={showEdit}
          onCancel={() => setShowEdit(false)}
          onSuccess={() => {
            setShowEdit(false);
            setCurrentUser(undefined);
          }}
        />

        <LoginModal onCancel={handleLoginCancel} visible={isLoginModalVisible} setShowSignup={setShowSignup} onSuccess={handleLoginCancel} />

        <Sidebar drawerVisible={drawerVisible} isMobile={isMobile} toggleDrawer={toggleDrawer} setCollapsed={setCollapsed} />

        <div className='flex flex-wrap items-center fixed left-0 top-1 justify-end py-3 pl-6 pr-32 z-50 gap-3'>
          <div className="flex items-center">
            <div className="block sm:hidden">
              {!currentUser && (
                <Dropdown overlay={signinOrSignupMenu} trigger={['click']}>
                  <Button
                    type="text"
                    className="rounded-full p-1"
                    icon={<LockOutlined />}
                  />
                </Dropdown>
              )}
            </div>
            {!currentUser && (
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
                    onClick={() => setShowSignup(true)}
                  >
                    ثبت‌نام
                  </Button>
                </Tooltip>
              </div>
            )}
          </div>
          {currentUser && (
            <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
              <Button type='text' icon={<Avatar key={currentUser?.avatar} src={currentUser?.avatar} size={isMobile ? undefined : 45} icon={!currentUser?.avatar ? <UserOutlined /> : null} />} className="cursor-pointer rounded-full" />
            </Dropdown>
          )}
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

        <Layout
          className='transition-all duration-300'
          style={{
            marginRight: !isMobile ? (collapsed ? "80px" : "200px") : undefined,
          }}>
          <HeaderComponent HeaderIcon={HeaderIcon} headerTitle={headerTitle} />

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
              <div className='flex justify-between w-full'>
                <a
                  href="https://mahmoud-yousefi.github.io/portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center gap-2"
                >
                  وب سایت ما
                  <LinkOutlined />
                </a>
              </div>
            </div>
          </Footer>
          <Button
            type='text'
            className="p-3 rounded-full text-xcolor5 shadow-md transition-transform transform hover:scale-110 fixed left-3 bottom-3 z-40"
            onClick={toggleTheme}
          >
            {isDarkMode ? <SunFilled className='text-white' /> : <MoonFilled className='text-white' />}
          </Button>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
