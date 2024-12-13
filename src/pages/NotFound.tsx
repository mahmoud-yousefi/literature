import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="صفحه مورد نظر یافت نشد"
        extra={
          <Button type="primary">
            <Link to="/">بازگشت به صفحه اصلی</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;