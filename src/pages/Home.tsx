import React from "react";
import { Button } from "antd";
import CarouselComponent from "../components/CarouselComponent";
import { useNavigate } from "react-router-dom";
import { slides } from "../utils";

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <header className="text-center py-16">
        <h1 className="text-4xl md:text-6xl !mb-10 text-blue-600 dark:text-blue-400">
          به دنیای ادبیات مولانا خوش آمدید
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 text-justify">
          ادبیات مولانا یکی از گنجینه‌های بزرگ فرهنگی ایران است که آثار او نه تنها در دوران زندگی‌اش، بلکه در قرن‌ها بعد نیز تاثیرات عمیق و گسترده‌ای بر فرهنگ و روح انسان‌ها گذاشته است. مولانا با کلمات خود دنیای جدیدی از معنا و احساسات را به تصویر می‌کشد و با آمیختن حکمت‌های عرفانی و فلسفی، به انسان‌ها درک عمیقی از زندگی، معنویت و ارتباط با خداوند می‌دهد. شعرهای او با زبان ساده و در عین حال عمیق، مفاهیم پیچیده‌ای چون عشق بی‌پایان، آزادی روحی و رشد معنوی را بیان می‌کند که همچنان در دل‌های مردم از دیرباز تا به امروز زنده است. آثار مولانا، به‌ویژه مثنوی معنوی، نه تنها در ایران، بلکه در سراسر جهان به عنوان یک منبع ارزشمند برای درک روح انسان و جستجوی حقیقت شناخته می‌شود. این آثار همچنان در آموزش و پرورش روحی انسان‌ها کاربرد دارند و در فرهنگ‌های مختلف به عنوان راهنمایی برای زندگی سالم و معنوی استفاده می‌شوند.
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/pictures')}
          className="mt-8 px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          شروع کنید
        </Button>
      </header>

      <section className="py-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-12 md:mb-16">
          ویژگی‌های سایت ما را کشف کنید
        </h2>
        <div className="max-w-screen-md mx-auto">
          <CarouselComponent slides={slides} featureCardClassName="h-[15rem]" />
        </div>
      </section>
    </div>
  );
};

export default App;
