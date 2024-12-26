import { Header } from 'antd/es/layout/layout';

interface props {
    HeaderIcon: any;
    headerTitle: string;
    children: any;
}

const HeaderComponent = ({ HeaderIcon, headerTitle, children }: props) => {
    return (
        <Header className="fixed px-3 w-full xs:h-10 lg:h-auto z-40 bg-gray-600/60 dark:bg-gray-800/60 backdrop-blur-lg text-white py-4 text-xl font-semibold flex items-center shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="wave-animation bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 opacity-50 h-full"></div>
            </div>
            <div className="flex items-center w-full">
                <div className='flex justify-start'>
                    <div className="ml-3 flex text-sm md:text-xl items-center justify-center">
                        {HeaderIcon as string}
                    </div>
                    <div className="flex-1 text-xs md:text-xl mt-1">{headerTitle}</div>
                </div>
            </div>
            {children}
        </Header>
    );
};

export default HeaderComponent;
