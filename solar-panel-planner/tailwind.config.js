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
        primaryGreen: '#95d387',
        secondaryYellow: '#f2dc96',
        secondaryGreen: '#d8eaab',
        background: '#f9f8f3',
      }
    },
  },
  plugins: [],
}

