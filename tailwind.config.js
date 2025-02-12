/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        primaryDark: '#1E40AF',
        primaryColor: '#3662FF',
      },
      spacing: {
        layoutHeader: '68px',
        layoutSidebar: '81px',
        mediaPreviewHeight: 400,
      },
      borderRadius: {
        10: '10px',
      },
    },
    fontFamily: {
      YBAKH: ['YBAKH'],
    },
  },
  corePlugins: {
    preflight: false,
  },
};
