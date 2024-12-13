import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  GlobalOutlined,
  ReadOutlined,
  BookOutlined,
} from "@ant-design/icons";

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const menuItems: MenuItem[] = [
  { key: "home", label: "صفحه اصلی", icon: <HomeOutlined />, path: "/", title: "صفحه اصلی" },
  {
    key: "books",
    label: "جستجوی کتاب",
    icon: <GlobalOutlined />,
    path: "/books",
    title: "جستجوی کتاب",
  },
  { key: "poems", label: "اشعار", icon: <ReadOutlined />, path: "/poems", title: "اشعار" },
  { key: "resources", label: "منابع", icon: <BookOutlined />, path: "/resources", title: "منابع" },
];

const SidebarMenu: React.FC = () => {
  const location = useLocation();

  const selectedKey = menuItems.find(item => item.path === location.pathname)?.key;

  return (
    <Menu theme="dark" mode="inline" selectedKeys={[selectedKey || "home"]} style={{backgroundColor: localStorage.getItem('theme') === 'light'? '#1F3A8A' : '#737C9B'}}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SidebarMenu;
