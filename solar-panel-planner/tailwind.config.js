/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryYellow: '#efcd5d',
        primaryGreen: '#7bc86a',
        secondaryYellow: '#f2dc96',
        secondaryGreen: '#96d388',
        background: '#f9f8f3',
        navbarBackground: '#f2f1e8',
      }
    },
  },
  plugins: [],
}

