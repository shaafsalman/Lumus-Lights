/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      fontFamily: {
        sans: ['"Century Gothic"', 'sans-serif'],
      },
      colors: {
        primary: '#bea77f', 
        primaryHover: '#bea77f', 
        secondary: '#22211f',  
      },
    },
  },
  darkMode: 'class', 
  plugins: [],
}
