import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  ReadOutlined,
  PictureOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { mockPictures, Picture } from "../pages/PicturesPage";
import { Poem } from "../pages/PoemsPage";
import { LiteraryMemory } from "../pages/MemoriesPage";
import { mockMemories, mockPoems } from "../utils";

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  title: string;
  items: Picture[] | Poem[] | LiteraryMemory[];
}

export const menuItems: MenuItem[] = [
  { key: "home", label: "صفحه اصلی", icon: <HomeOutlined />, path: "/", title: "صفحه اصلی", items: [] },
  {
    key: "pictures",
    label: "عکس‌ها",
    icon: <PictureOutlined />,
    path: "/pictures",
    title: "عکس‌ها",
    items: mockPictures,
  },
  { key: "poems", label: "اشعار", icon: <ReadOutlined />, path: "/poems", title: "اشعار", items: mockPoems },
  { key: "memories", label: "خاطره‌ها", icon: <CameraOutlined />, path: "/memories", title: "خاطره‌ها", items: mockMemories },
];

const SidebarMenu: React.FC = () => {
  const location = useLocation();

  const getSelectedKey = (): string | undefined => {
    const matchedItem = menuItems.find((item) => {
      const dynamicPathPattern = item.path.replace(/:\w+/g, "[^/]+");
      const regex = new RegExp(`^${dynamicPathPattern}$`);
      return regex.test(location.pathname);
    });

    if(matchedItem?.key) return matchedItem?.key;
    else return location.pathname.split('/')[1];
  };

  const selectedKey = getSelectedKey();

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey || "home"]}
      className="bg-blue-900 bg-opacity-0 dark:bg-opacity-0 dark:bg-blue-950"
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SidebarMenu;
