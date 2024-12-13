import { Card } from "antd";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  icon: ReactNode;
  link?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  altText,
  icon,
  link,
}) => {
  return (
    <div>
      <Card
        hoverable
        className="shadow-lg w-full h-full rtl"
        cover={<img alt={altText} src={imageSrc} className="w-5" />}
      >
        <Card.Meta
          avatar={icon}
          title={
            link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {title}
              </a>
            ) : (
              <span>{title}</span>
            )
          }
          description={description}
        />
      </Card>
    </div>
  );
};

export default FeatureCard;
