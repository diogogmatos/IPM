/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fffcea',
          '100': '#fff5c5',
          '200': '#ffec85',
          '300': '#ffdb46',
          '400': '#ffc81b',
          '500': '#fea500',
          '600': '#e27d00',
          '700': '#bb5602',
          '800': '#984208',
          '900': '#7c360b',
          '950': '#481b00',
        }
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
      pattern: /bg-(primary|red|green|yellow|blue|amber|neutral|orange|lime|black|purple)-100/,      
    },
    {
      pattern: /text-(primary|red|green|yellow|blue|amber|neutral|orange|lime|black|purple)-600/,
    },
    {
      pattern: /border-(primary|red|green|yellow|blue|amber|neutral|orange|lime|black|purple)-600/,
    }
  ],
  plugins: [],
}

