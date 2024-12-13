import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
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
}

const menuItems: MenuItem[] = [
  { key: "1", label: "Home", icon: <HomeOutlined />, path: "/" },
  {
    key: "2",
    label: "Explore Cultures",
    icon: <GlobalOutlined />,
    path: "/explore",
  },
  { key: "3", label: "Cultural Quiz", icon: <ReadOutlined />, path: "/quiz" },
  { key: "4", label: "Resources", icon: <BookOutlined />, path: "/resources" },
];

const SidebarMenu: React.FC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SidebarMenu;
