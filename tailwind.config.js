/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#1c3d5a',
        turquoise: '#42b2a6',
        white: '#ffffff',
        'light-gray': '#f2f2f2',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
