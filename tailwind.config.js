/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0a1a0f',
          900: '#0f2618',
          800: '#153420',
          700: '#1b4229',
          600: '#1e5631',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf8f0',
          200: '#f5efe3',
          300: '#ebe0cd',
        },
        blaze: {
          400: '#ff8c38',
          500: '#ff6f1a',
          600: '#e85d0a',
          700: '#c44d08',
        },
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
