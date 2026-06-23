/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mango: '#FFC533',
        pickle: '#FF7A00',
        chili: '#E63946',
        fresh: '#5BBE5B',
        cream: '#FFF8ED',
        brown: '#4A2C16',
        lime: '#B6FF6B',
        background: '#FFF8ED',
        foreground: '#4A2C16',
        footerRed: '#740A03',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
