import { Drawer, Layout } from 'antd';
import SidebarMenu from './SidebarMenu';

const Sidebar = ({
    isMobile,
    drawerVisible,
    toggleDrawer,
    setCollapsed
}: {
    isMobile: boolean;
    drawerVisible: boolean;
    toggleDrawer: () => void;
    setCollapsed: (collapsed: boolean) => void;
}) => (
    isMobile ? (
        <Drawer
            closeIcon={false}
            placement="left"
            visible={drawerVisible}
            onClose={toggleDrawer}
            onClick={toggleDrawer}
            className='dark:!bg-blue-950 !bg-opacity-95 dark:!bg-opacity-95 !bg-blue-900'
            width={250}
        >
            <div className="m-4">
                <img
                    src="https://cdn.tarhbama.com/1400/Image/2021/11/25/7/filelogo.jpg"
                    alt="Logo"
                    className="w-full rounded-full"
                />
            </div>
            <SidebarMenu />
        </Drawer>
    ) : (
        <Layout.Sider
            collapsible
            breakpoint="lg"
            collapsedWidth="80"
            className="bg-blue-900 dark:bg-blue-950 fixed h-full z-50"
            onCollapse={(collapsedState) => setCollapsed(collapsedState)}
        >
            <div className='overflow-hidden h-full'>
                <div className="m-4">
                    <img
                        src="https://cdn.tarhbama.com/1400/Image/2021/11/25/7/filelogo.jpg"
                        alt="Logo"
                        className="w-full rounded-full"
                    />
                </div>
                <SidebarMenu />
            </div>
        </Layout.Sider>
    )
);

export default Sidebar;