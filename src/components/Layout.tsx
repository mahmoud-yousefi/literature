import { Button, ConfigProvider, Layout, Drawer, Menu, Dropdown } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState, useEffect } from 'react';
import SidebarMenu, { menuItems } from './SidebarMenu';
import { Content, Footer } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import { BookOutlined, MoonFilled, SunFilled, MenuOutlined, EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import HeaderComponent from './HeaderComponent';

const AppLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

  const handleMenuClick = ({ key }: any) => {
    if (key === 'edit') {
      console.log('Edit Account');
    } else if (key === 'logout') {
      //   Cookies.remove('userAvatar'); // Clear cookie on logout
      setUserAvatar(null);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        ویرایش حساب کاربری
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        خروج
      </Menu.Item>
    </Menu>
  );

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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDarkMode ? '#1E40AF' : '#1D4ED8',
        },
      }}
    >
      <Layout className="min-h-screen" dir="rtl">
        <div className='flex items-center fixed left-0 pt-3 z-50'>
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <Button type='text' className="cursor-pointer rounded-full mr-3">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              ) : (
                <UserOutlined className="text-white text-xl" />
              )}
            </Button>
          </Dropdown>
          {
            isMobile ? (
              <Button
                type="text"
                className="rounded-full text-xl text-xcolor5"
                onClick={toggleDrawer}
              >
                <MenuOutlined />
              </Button>
            ) : null
          }
        </div>
        {isMobile ? (
          <>
            <Drawer
              closeIcon={false}
              placement="left"
              closable
              visible={drawerVisible}
              onClose={toggleDrawer}
              className='dark:!bg-xcolor6 !bg-blue-400'
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
          </>
        ) : (
          <Sider
            collapsible
            breakpoint="lg"
            collapsedWidth="80"
            className="bg-gray-700 dark:bg-gray-800"
          >
            <div className="m-4">
              <img
                src="https://cdn.tarhbama.com/1400/Image/2021/11/25/7/filelogo.jpg"
                alt="Logo"
                className="w-full rounded-full"
              />
            </div>
            <SidebarMenu />
          </Sider>
        )}

        <Layout>
          <HeaderComponent HeaderIcon={HeaderIcon} headerTitle={headerTitle} />

          <Content
            className="px-6 py-20 bg-white dark:bg-gray-900 text-black dark:text-white"
          >
            <Outlet />
          </Content>

          <Footer className="fixed bottom-0 w-full bg-gray-800/50 dark:bg-gray-900/50 backdrop-blur-md text-white py-4 overflow-hidden shadow-lg border-t border-gray-700">
            <div className="absolute inset-0 -z-10">
              <div className="wave-animation bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 opacity-40 h-full"></div>
            </div>
            <div className="flex w-full justify-around items-center relative z-10">
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
          </Footer>

          <Button
            type='text'
            className="fixed bottom-3 left-5 p-3 rounded-full text-xcolor5 shadow-md transition-transform transform hover:scale-110"
            onClick={toggleTheme}
          >
            {isDarkMode ? <SunFilled /> : <MoonFilled />}
          </Button>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
