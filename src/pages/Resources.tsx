import React from "react";
import { List } from "antd";

const Resources: React.FC = () => {
  const resources = [
    { title: "Book 1", description: "A guide to cultural diversity." },
    { title: "Article 2", description: "Understanding world cultures." },
    { title: "Documentary 3", description: "Exploring traditions globally." },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Resources</h2>
      <List
        bordered
        dataSource={resources}
        renderItem={(item) => (
          <List.Item>
            <strong>{item.title}:</strong> {item.description}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Resources;
