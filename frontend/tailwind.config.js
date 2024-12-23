/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        Publica: ['Publica'],  
        PublicaSans: ['PublicaSans'],  
        poppins: ['Poppins', 'sans-serif'],
        CenturyGothic: ['CenturyGothic', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'], 
      },
      colors: {
        primary: '#bea77f', 
        primaryHover: '#bea77f', 
        secondary: '#22211f',
        light: '#F0F0F0',  
        // primary: {
        //   light: '#5B6E7E',   // Muted blue-gray
        //   dark: '#2C3E50',    // Deep slate blue
        // },
        card: {
          light: 'rgba(220, 220, 220, 0.3)', // Subtle gray with transparency for better contrast on white
          dark: 'rgba(45, 45, 45, 0.8)', // Darker background for the card in dark mode
        },
        accent: '#bea77f', 
        accentHover: '#bea77f', 
        accentGradient: '#bea77f',
        // Additional colors
titanium: '#8c8c8c',           // Titanium gray
champagne: '#f1e1b3',          // Light champagne (soft goldish tone)
slateGray: '#708090',          // Slate gray
lightGold: '#e1c16e',          // Light gold for accenting
softSilver: '#c0c0c0',         // Soft silver for subtle highlights
darkTitanium: '#595959',       // Dark titanium for contrast
beige: '#f5f5dc',              // Beige for warm background touches
bronze: '#cd7f32',             // Bronze accent color
brightCyan: "#00FFFF",        // Cyan contrast
  electricBlue: "#7DF9FF",      // Electric Blue
  crimsonRed: "#DC143C",        // Crimson Red
  limeGreen: "#32CD32",         // Lime Green
  brightYellow: "#FFFF00",      // Bright Yellow
  magenta: "#FF00FF",           // Magenta
  turquoise: "#40E0D0",         // Turquoise
  hotPink: "#FF69B4",           // Hot Pink
  neonGreen: "#39FF14",         // Neon Green
  vividOrange: "#FF4500",       // Vivid Orange
  darkPurple: "#800080",        // Dark Purple
  maroon: "#800000",            // Maroon
  electricViolet: "#8A2BE2",    // Electric Violet
  chartreuse: "#7FFF00",        // Chartreuse Green
  deepPink: "#FF1493",          // Deep Pink
  deepSkyBlue: "#00BFFF",       // Deep Sky Blue
  coral: "#FF7F50",             // Coral
  lime: "#BFFF00",              // L
  
      },
    },
  },
  darkMode: 'class', 
  plugins: [],
}
