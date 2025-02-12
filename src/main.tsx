import 'antd-jalali';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './assets/styles/custom-styles.css';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/lib/locale/fa_IR';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={{ ...fa_IR }}
      direction="rtl"
    >
    <App />
    </ConfigProvider>
  </React.StrictMode>
);
