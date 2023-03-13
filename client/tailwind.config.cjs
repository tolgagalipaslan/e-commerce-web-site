/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainNavbar': '#BCBFC0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}