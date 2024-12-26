import { Footer } from "antd/es/layout/layout";

const FooterComponent = () => {
  return (
    <Footer className="fixed bottom-0 w-full bg-gray-800/50 dark:bg-gray-900/50 backdrop-blur-md text-white py-4 overflow-hidden shadow-lg border-t border-gray-700">
      <div className="absolute inset-0 -z-10">
        <div className="wave-animation bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 opacity-40 h-full"></div>
      </div>
      <div className="flex w-full justify-around items-center relative z-10">
        <p className="text-sm font-light">
          کلیه حقوق محفوظ است &copy; {new Date().getFullYear()}
        </p>
        <a
          href="https://mahmoud-yousefi.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          وب سایت ما
        </a>
      </div>
    </Footer>
  )
}

export default FooterComponent;