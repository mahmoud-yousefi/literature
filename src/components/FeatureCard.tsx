import { Card } from "antd";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  icon: ReactNode;
  link?: string;
  featureCardClassName: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  altText,
  icon,
  link,
  featureCardClassName
}) => {
  return (
    <div className="w-full h-full">
      <Card
        hoverable
        className="shadow-lg w-full rtl dark:bg-gray-800 dark:text-white"
        cover={<img alt={altText} src={imageSrc} className={`object-cover ${featureCardClassName} w-full`} />}
      >
        <Card.Meta
          avatar={icon}
          title={
            link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {title}
              </a>
            ) : (
              <span className="text-black dark:text-white">{title}</span>
            )
          }
          description={
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
              {description}
            </p>
          }
        />
      </Card>
    </div>
  );
};

export default FeatureCard;
