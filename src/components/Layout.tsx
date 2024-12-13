import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} dir="rtl">
      {/* Sidebar */}
      <Sider
        collapsible
        breakpoint="lg"
        collapsedWidth="80"
        style={{ backgroundColor: "#001529" }}
      >
        <div
          style={{
            height: "64px",
            margin: "16px",
            color: "#fff",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <img src="https://cdn.tarhbama.com/1400/Image/2021/11/25/7/filelogo.jpg" alt="Logo" style={{ width: '70px', height: 'auto' }} />
        </div>
        <SidebarMenu />
      </Sider>

      {/* Main Layout */}
      <Layout>
        <Header
          style={{
            backgroundColor: "#1890ff",
            color: "white",
            padding: "0 24px",
            fontSize: "18px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          بستر سواد فرهنگی
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#001529",
            color: "white",
            padding: "12px 0",
          }}
        >
          سواد فرهنگی. کلیه حقوق محفوظ است.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
