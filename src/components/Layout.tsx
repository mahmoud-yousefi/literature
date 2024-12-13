import { Button, ConfigProvider, Layout, Drawer } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState, useEffect } from 'react';
import SidebarMenu, { menuItems } from './SidebarMenu';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import { BookOutlined, MoonFilled, SunFilled, MenuOutlined } from '@ant-design/icons';

const AppLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        {isMobile ? (
          <>
            <Button
              type="text"
              className="fixed top-5 left-5 p-3 rounded-full text-xl text-xcolor5 z-50"
              onClick={toggleDrawer}
            >
              <MenuOutlined />
            </Button>
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
            className="bg-gray-800 dark:bg-gray-900"
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
          <Header className="bg-blue-600 dark:bg-gray-800 text-white py-4 px-6 text-xl font-semibold flex items-center shadow-md animate-fadeIn">
            <div className="mr-3 text-2xl ml-2">{HeaderIcon as string}</div>
            {headerTitle}
          </Header>

          <Content
            className="px-6 py-4 bg-white dark:bg-gray-900 text-black dark:text-white"
          >
            <Outlet />
          </Content>

          <Footer className="fixed bottom-0 w-full bg-gray-800 text-white py-6 mt-auto overflow-hidden dark:bg-gray-900">
            <div className="absolute inset-0 -z-10">
              <div className="wave-animation bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 opacity-50 h-full"></div>
            </div>
            <div className="flex w-full justify-around items-center relative z-10">
              <p className="text-sm font-extralight">
                کلیه حقوق محفوظ است &copy; {new Date().getFullYear()}
              </p>
              <a
                href="https://mahmoud-yousefi.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
              >
                وب سایت ما
              </a>
            </div>
          </Footer>
          <div className='h-10' />
          <Button
            type='text'
            className="fixed bottom-5 left-5 p-3 rounded-full text-xcolor5 shadow-md transition-transform transform hover:scale-110"
            onClick={toggleTheme}
          >
            {isDarkMode ? <MoonFilled /> : <SunFilled />}
          </Button>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
