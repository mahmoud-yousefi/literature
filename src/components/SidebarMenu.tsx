import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  ReadOutlined,
  PictureOutlined,
  CameraOutlined,
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
    key: "pictures",
    label: "عکس‌ها",
    icon: <PictureOutlined />,
    path: "/pictures",
    title: "عکس‌ها",
  },
  { key: "poems", label: "اشعار", icon: <ReadOutlined />, path: "/poems", title: "اشعار" },
  { key: "memories", label: "خاطره‌ها", icon: <CameraOutlined />, path: "/memories", title: "خاطره‌ها" },
];

const SidebarMenu: React.FC = () => {
  const location = useLocation();

  const selectedKey = menuItems.find(item => item.path === location.pathname)?.key;

  return (
    <Menu theme="dark" mode="inline"  selectedKeys={[selectedKey || "home"]} className="bg-blue-900 bg-opacity-0 dark:bg-opacity-0 dark:bg-blue-950">
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SidebarMenu;
