/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'vintra': {
            dark: '#0A1D2E',
            primary: '#4CB4C6',
            secondary: '#7ED6E8',
            light: '#F4F6F8',
          }
        },
        fontFamily: {
          'sans': ['Inter', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }