/** @type {import('tailwindcss').Config} */
import plugin from 'flowbite/plugin';
export default {
  darkMode: 'class', // Enables dark mode using a CSS class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin,
  ],
}

