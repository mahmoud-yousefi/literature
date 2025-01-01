import React, { useState } from 'react';
import { Input, List, Card, Button, Modal, Pagination, notification } from 'antd';
import EmptyState from '../components/EmptyState';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

// Mock data for poems
type Poem = {
  id: number;
  title: string;
  poet: string;
  content: string;
};

const mockPoems = [
  { id: 1, title: 'رباعیات خیام', poet: 'عمر خیام', content: 'این قافلهٔ عمر عجب می‌گذرد / دریاب دمی که با طرب می‌گذرد' },
  { id: 2, title: 'غزلیات حافظ', poet: 'حافظ شیرازی', content: 'الا یا ایها الساقی ادر کاساً و ناولها / که عشق آسان نمود اول ولی افتاد مشکل‌ها' },
  { id: 3, title: 'شاهنامه', poet: 'فردوسی', content: 'بسی رنج بردم در این سال سی / عجم زنده کردم بدین پارسی' },
  { id: 4, title: 'دیوان شمس', poet: 'مولانا', content: 'بشنو از نی چون حکایت می‌کند / از جدایی‌ها شکایت می‌کند' },
  { id: 5, title: 'مثنوی معنوی', poet: 'مولانا', content: 'هر کسی از ظن خود شد یار من / از درون من نجست اسرار من' },
  { id: 6, title: 'گلستان', poet: 'سعدی', content: 'هر نفس که فرو می‌رود ممد حیات است و چون برمی‌آید مفرح ذات' },
  { id: 7, title: 'بوستان', poet: 'سعدی', content: 'توانا بود هر که دانا بود / ز دانش دل پیر برنا بود' },
  { id: 8, title: 'غزلیات عطار', poet: 'عطار نیشابوری', content: 'در عشق اگر ثابت و مستحکم باشی / چون شمع همیشه سوز و سرگردان باشی' },
  { id: 9, title: 'دیوان عراقی', poet: 'فخرالدین عراقی', content: 'دل در هوای وصل تو تنها شد ای دریغ / دل هم ز جان گذشت و ز دنیا شد ای دریغ' },
  { id: 10, title: 'دیوان خواجوی کرمانی', poet: 'خواجوی کرمانی', content: 'ما بی‌غم تو زنده نمانیم / بر غم دگر تعلق نداریم' },
  { id: 11, title: 'رباعیات باباطاهر', poet: 'باباطاهر', content: 'ز دست دیده و دل هر دو فریاد / که هر چه دیده بیند دل کند یاد' },
  { id: 12, title: 'دیوان وحشی بافقی', poet: 'وحشی بافقی', content: 'در دل ز شوق عشق تو غوغای دیگری است / در جسم و جان و روح تمنای دیگری است' },
  { id: 13, title: 'دیوان جامی', poet: 'عبدالرحمان جامی', content: 'هر دم ز نی‌لبک دم عشقت کشم / همواره با عشقت نوایم خوش کنم' },
  { id: 14, title: 'دیوان نظامی', poet: 'نظامی گنجوی', content: 'بگو ای باد فروردین ز حال سرو آزادی / که سرسبزی همه از اوست در این فصل دل‌آزادی' },
  { id: 15, title: 'دیوان سنایی', poet: 'سنایی غزنوی', content: 'ما را دو دیده به راهت سفید شد / چون من که بر در تو دیده بر سپید شد' },
  { id: 16, title: 'دیوان انوری', poet: 'انوری', content: 'از دیده برفتم به دل‌خون درونم / بیچاره دل غافل که بس پر خون درونم' },
  { id: 17, title: 'دیوان مهستی', poet: 'مهستی گنجوی', content: 'دل ما در سر زلف تو گرفتار آمد / دل از این ماجرا بی‌خبر و خوار آمد' },
  { id: 18, title: 'دیوان قاآنی', poet: 'قاآنی شیرازی', content: 'به هر کس باری از غم است بر دوش / مرا یک دل است و آن پر است از جوش' },
  { id: 19, title: 'دیوان پروین', poet: 'پروین اعتصامی', content: 'اگر زنی به سعی و به کار مردانه / گلی بروید از شاخ غم‌خواری' },
  { id: 20, title: 'دیوان رهی', poet: 'رهی معیری', content: 'در دلم شوری ز عشق جانسوز است / از دلم شوریده چیزی معلوم است' },
  { id: 21, title: 'دیوان شفیعی', poet: 'شفیعی کدکنی', content: 'هر چه هستی از عشق است ای دل / عشق می‌دهد به زندگی تمایل' },
  { id: 22, title: 'دیوان فریدون', poet: 'فریدون مشیری', content: 'هر کجا هستی که دل در هوایت / هیچ کس دل از یادت نشاید' },
  { id: 23, title: 'دیوان نیما', poet: 'نیما یوشیج', content: 'ای شب از غم به خشم بیاور من / شب‌پره‌های دل آرایم' },
  { id: 24, title: 'دیوان اخوان', poet: 'اخوان ثالث', content: 'در دل خروشی است از شوق وصال / ای کاش که گردیم ما زین خیال' },
  { id: 25, title: 'دیوان سپهری', poet: 'سهراب سپهری', content: 'به یاد کودکی‌هایم ز زیر آب / به گودالی بیاید باز باران' },
  { id: 26, title: 'دیوان شاملو', poet: 'احمد شاملو', content: 'بر دل خونین من گواهی ده / ای عشق بر دل خسته گواهی ده' },
  { id: 27, title: 'دیوان فروغ', poet: 'فروغ فرخزاد', content: 'جهانی از چشم پرستش می‌کنم / جهان را پر از آتش می‌کنم' },
  { id: 28, title: 'دیوان سیمین', poet: 'سیمین بهبهانی', content: 'شبانه آهم می‌زند بر دل زارم / سحرگه بوسه می‌دهد بر روی تارم' },
  { id: 29, title: 'دیوان شهریار', poet: 'شهریار', content: 'عاشق‌تر از من هیچ کس ندید / در غم عشق همیشگی‌ام چه نازک‌خیال' },
  { id: 30, title: 'دیوان فروغ', poet: 'فروغ فرخزاد', content: 'در شب سیاه درخشیدی / فانوس خیال بودم من' },
];


const PoemsPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [poems, setPoems] = useState<(Poem & { isAddCard?: boolean })[]>(mockPoems);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPoem, setNewPoem] = useState<{ title: string; poet: string; content: string }>({ title: '', content: '', poet: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleSearch = () => {
    const filteredPoems = mockPoems.filter(
      (poem) =>
        poem.title.includes(query) ||
        poem.poet.includes(query) ||
        poem.content.includes(query)
    );
    setPoems(filteredPoems);
    setCurrentPage(1);
  };

  const handleAddPoem = () => {
    if (newPoem.title && newPoem.content) {
      const newId = poems.length ? poems[poems.length - 1].id + 1 : 1;
      setPoems([...poems, { id: newId, title: newPoem.title, poet: newPoem.poet, content: newPoem.content }]);
      setNewPoem({ title: '', content: '', poet: '' });
      setIsModalVisible(false);
    } else {
      notification.error({ message: 'لطفاً همه موارد را وارد کنید.' });
    }
  };

  const paginatedPoems = poems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-10 bg-gray-50 min-h-screen dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">لیست اشعار</h1>
        <div className="flex items-center mb-6">
          <Input
            placeholder="جستجو بر اساس عنوان، شاعر یا متن شعر..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={handleSearch}
            className="w-full dark:bg-gray-700 dark:text-white dark:placeholder:text-white rounded-l-none"
          />
          <Button
            type="primary"
            onClick={handleSearch}
            className="!ml-2 h-full rounded-r-none p-2"
            icon={<SearchOutlined />}
          />
        </div>

        <List
          dataSource={[...paginatedPoems, { id: 0, title: '', poet: '', content: '', isAddCard: true }]}
          renderItem={(poem) => (
            poem.isAddCard ? (
              <List.Item>
                <Card
                  hoverable
                  className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  onClick={() => setIsModalVisible(true)}
                >
                  <div className="bg-gray-100 rounded-full p-6 flex items-center justify-center mb-4 dark:bg-gray-700">
                    <PlusOutlined className="text-4xl text-gray-500 dark:text-white" />
                  </div>
                  <p className="text-gray-600 font-medium dark:text-gray-300">افزودن شعر</p>
                </Card>
              </List.Item>
            )
              :
              <List.Item>
                <Card
                  hoverable
                  className='dark:bg-gray-800 dark:hover:shadow-lg dark:hover:shadow-white'
                >
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{poem.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{poem.poet}</p>
                  <p className="text-gray-500 dark:text-gray-400">{poem.content}</p>
                </Card>
              </List.Item>
          )}
          locale={{ emptyText: <EmptyState /> }}
        />

        <div className="flex justify-center mt-6 ltr">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={poems.length}
            onChange={(page) => setCurrentPage(page)}
            className="dark:text-white bg-gray-100 rounded-md"
          />
        </div>
      </div>

      <Modal
        title={<div className='w-full text-center p-4'>افزودن شعر جدید</div>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddPoem}
        footer={null}
        className='p-2'
      >
        <div className="space-y-2 p-4">
          <Input
            placeholder="عنوان شعر"
            value={newPoem.title}
            onChange={(e) => setNewPoem((prev) => ({ ...prev, title: e.target.value }))}
            className="mb-4"
          />
          <Input
            placeholder="عنوان شعر"
            value={newPoem.poet}
            onChange={(e) => setNewPoem((prev) => ({ ...prev, poet: e.target.value }))}
            className="mb-4"
          />
          <Input.TextArea
            placeholder="توضیحات"
            value={newPoem.content}
            onChange={(e) => setNewPoem((prev) => ({ ...prev, content: e.target.value }))}
            rows={4}
          />
          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setIsModalVisible(false)}
              className="px-6 py-2"
            >
              لغو
            </Button>
            <Button
              type="primary"
              onClick={handleAddPoem}
              className="px-6 py-2"
            >
              ثبت
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PoemsPage;
