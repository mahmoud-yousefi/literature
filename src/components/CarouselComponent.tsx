import React from 'react';
import { Carousel } from 'antd';
import FeatureCard from './FeatureCard';

type CarouselSlide = {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  icon: JSX.Element;
  link: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
};

const CarouselComponent: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <Carousel autoplay infinite autoplaySpeed={3000} arrows>
      {slides.map((slide, index) => (
        <div key={index} className="px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-md mx-auto py-6 sm:py-8 md:py-12">
            <FeatureCard
              title={slide.title}
              description={slide.description}
              imageSrc={slide.imageSrc}
              altText={slide.altText}
              icon={slide.icon}
              link={slide.link}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
