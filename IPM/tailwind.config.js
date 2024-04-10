/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#FEA500",
        primaryHover: "#E59400",
      },
      width:{
        84: "21.5rem",
      }
    },
    fontFamily: {
      'display': ['Inter', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
    }
  },
  safelist: [
    {
      pattern: /bg-(primary|red|green|yellow|blue)-100/,      
    },
    {
      pattern: /text-(primary|red|green|yellow|blue)-600/,
    }
  ],
  plugins: [],
}

