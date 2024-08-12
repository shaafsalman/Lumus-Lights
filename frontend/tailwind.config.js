/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
