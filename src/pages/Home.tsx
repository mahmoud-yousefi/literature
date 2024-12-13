import React from "react";
import { Button, Carousel } from "antd";
import { GlobalOutlined, QuestionCircleFilled, ReadOutlined } from "@ant-design/icons";
import FeatureCard from "../components/FeatureCard";

const App: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600">
          به دنیای ادبیات مولانا خوش آمدید
        </h1>
        <br />
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          ادبیات مولانا از جمله گنجینه‌های ارزشمند فرهنگی ایران است که آثارش از قرن‌ها پیش تا به امروز در دل‌های مردم جا دارد. از طریق شعرهای عمیق و پرمحتوا، مولانا به انسان‌ها آگاهی و راهنمایی می‌بخشد و مفاهیم مهمی چون عشق، آزادی و رشد معنوی را بیان می‌کند.
        </p>
        <Button type="primary" size="large" className="mt-8 px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          شروع کنید
        </Button>
      </header>

      <section className="py-16">
        <h2 className="text-3xl md:text-4xl !mb-5 font-semibold text-center text-gray-800 mb-8">
          ویژگی‌های سایت ما را کشف کنید
        </h2>
        <Carousel autoplay infinite style={{ padding: "0 20px" }} autoplaySpeed={3000}>
          {/* Slide 1 */}
          <div className="!flex w-full h-full space-x-4">
            <div className="flex sm:w-full md:w-1/3 h-full p-4">
              <FeatureCard
                title="اکتشاف فرهنگ‌ها"
                description="به دنیای متنوعی از موضوعات فرهنگی بپردازید و درک خود را از سنت‌های جهانی افزایش دهید."
                imageSrc="https://file.tjoor.com/img/a/1428-screenshot20210915110115~2/%D8%A7%D8%B4%D8%B9%D8%A7%D8%B1-%D8%B2%DB%8C%D8%A8%D8%A7%DB%8C-%D9%85%D9%88%D9%84%D8%A7%D9%86%D8%A7-%D8%A8%D9%87-%D9%85%D9%86%DB%8C%D8%A7%D8%B3%D8%A8%D8%AA-%D8%B2%D8%A8%D8%B1%DA%AF%D8%AF%D8%A7%D8%B4%D8%AA-%D9%85%D9%88%D9%84%D8%A7%D9%86%D8%A7-%D8%AF%D8%B1-%D9%87%D8%B4%D8%AA-%D9%85%D9%87%D8%B1-1400.png"
                altText="اکتشاف فرهنگ‌ها"
                icon={<GlobalOutlined className="text-4xl text-blue-600" />}
                link="https://file.tjoor.com/img/a/1428-screenshot20210915110115~2/%D8%A7%D8%B4%D8%B9%D8%A7%D8%B1-%D8%B2%DB%8C%D8%A8%D8%A7%DB%8C-%D9%85%D9%88%D9%84%D8%A7%D9%86%D8%A7-%D8%A8%D9%87-%D9%85%D9%86%DB%8C%D8%A7%D8%B3%D8%A8%D8%AA-%D8%B2%D8%A8%D8%B1%DA%AF%D9%BE%D8%AF%D8%A7%D8%B4%D8%AA-%D9%85%D9%88%D9%84%D8%A7%D9%86%D8%A7-%D8%AF%D8%B1-%D9%87%D8%B4%D8%AA-%D9%85%D9%87%D8%B1-1400.png"
              />
            </div>

            <div className="flex sm:w-full md:w-1/3 h-full p-4">
              <FeatureCard
                title="شرکت در آزمون‌ها"
                description="دانش خود را با آزمون‌های تعاملی و جذاب بسنجید و مهارت‌های فرهنگی خود را محک بزنید."
                imageSrc="https://taaghche.com/blog/wp-content/uploads/2022/06/%D8%A7%D8%B4%D8%B9%D8%A7%D8%B1-%D8%B9%D8%A7%D8%B4%D9%82%D8%A7%D9%86%D9%87-%D9%85%D9%88%D9%84%D8%A7%D9%86%D8%A7.jpg"
                altText="شرکت در آزمون‌ها"
                icon={<QuestionCircleFilled className="text-4xl text-blue-600" />}
                link="https://taaghche.com/blog/wp-content/uploads/2022/06/%D8%A7%D8%B4%D8%B9%D8%A7%D8%B1-%D8%B9%D8%A7%D8%B4%D9%82%D8%A7%D9%86%D9%87-%D9%85%D9%88%D9%84%D8%A7%D9%86%D8%A7.jpg"
              />
            </div>

            <div className="flex sm:w-full md:w-1/3 h-full p-4">
              <FeatureCard
                title="دسترسی به منابع"
                description="منابع منحصر به فردی از جمله مقالات، کتاب‌ها و ویدئوها برای افزایش آگاهی فرهنگی خود پیدا کنید."
                imageSrc="https://roozaneh.net/wp-content/uploads/2018/07/molana-1-e1533057335867.png.webp"
                altText="دسترسی به منابع"
                icon={<ReadOutlined className="text-4xl text-blue-600" />}
                link="https://www.soorban.com/images/news/2022/08/1660650504_A1pP6.jpg"
              />
            </div>
          </div>

          {/* Slide 2 */}
          <div className="!flex w-full h-full space-x-4">
            <div className="flex sm:w-full md:w-1/3 h-full p-4">
              <FeatureCard
                title="برگزاری وبینارها"
                description="در وبینارهای تعاملی شرکت کنید و دانش خود را از طریق تبادل نظر با دیگران گسترش دهید."
                imageSrc="https://some-image-source.com/your-image-1.png"
                altText="برگزاری وبینارها"
                icon={<GlobalOutlined className="text-4xl text-blue-600" />}
                link="https://some-link.com"
              />
            </div>

            <div className="flex sm:w-full md:w-1/3 h-full p-4">
              <FeatureCard
                title="یادگیری از ویدئوها"
                description="از ویدئوهای آموزشی برای ارتقاء دانش فرهنگی خود استفاده کنید."
                imageSrc="https://some-image-source.com/your-image-2.png"
                altText="یادگیری از ویدئوها"
                icon={<QuestionCircleFilled className="text-4xl text-blue-600" />}
                link="https://some-link.com"
              />
            </div>

            <div className="flex sm:w-full md:w-1/3 h-full p-4">
              <FeatureCard
                title="کتاب‌های الکترونیکی"
                description="به مجموعه‌ای از کتاب‌های الکترونیکی برای مطالعه دسترسی پیدا کنید."
                imageSrc="https://some-image-source.com/your-image-3.png"
                altText="کتاب‌های الکترونیکی"
                icon={<ReadOutlined className="text-4xl text-blue-600" />}
                link="https://some-link.com"
              />
            </div>
          </div>
        </Carousel>
      </section>
    </div>
  );
};

export default App;
