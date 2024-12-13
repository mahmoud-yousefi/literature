import React from "react";
import { Card } from "antd";

const ExploreCultures: React.FC = () => {
  const cultures = [
    { name: "Japanese", description: "Learn about Japan's traditions." },
    { name: "Indian", description: "Discover India's vibrant heritage." },
    { name: "French", description: "Dive into French art and cuisine." },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore Different Cultures
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cultures.map((culture, index) => (
          <Card key={index} title={culture.name} bordered>
            <p>{culture.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreCultures;
