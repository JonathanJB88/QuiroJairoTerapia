/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

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
        'navy-blue-lighter': '#2d4f6f',
        turquoise: '#42b2a6',
        'turquoise-lighter': '#58c3b6',
        white: '#ffffff',
        'light-gray': '#f2f2f2',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('daisyui')],
};
