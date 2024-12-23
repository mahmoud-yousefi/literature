import { Header } from 'antd/es/layout/layout';

interface props {
    HeaderIcon: any;
    headerTitle: string;
}

const HeaderComponent = ({ HeaderIcon, headerTitle }: props) => {
    return (
        <Header className="fixed w-full xs:h-10 lg:h-auto z-40 bg-gray-600/60 dark:bg-gray-800/60 backdrop-blur-lg text-white py-4 px-6 text-xl font-semibold flex items-center shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="wave-animation bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 opacity-50 h-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className='flex justify-between w-1/2'>
                    <div className="ml-3 text-2xl flex items-center justify-center">
                        {HeaderIcon as string}
                    </div>
                    <div className="flex-1 text-base mt-1">{headerTitle}</div>
                </div>
                <div className='w-1/7'></div>
            </div>
        </Header>
    );
};

export default HeaderComponent;
