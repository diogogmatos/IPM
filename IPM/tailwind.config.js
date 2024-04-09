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
    }
  },
  plugins: [],
}

