/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'udem-blue': '#0055A4',
        'udem-red': '#ED2939',
        'montreal-dark': '#1A1A2E',
        'montreal-light': '#F8F9FA',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}