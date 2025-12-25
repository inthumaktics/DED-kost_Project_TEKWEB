/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6', // Electric Violet
          50: '#f0f9ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
        },
        accent: {
          DEFAULT: '#84cc16', // Lime Green
          500: '#84cc16',
          600: '#65a30d',
        }
      }
    },
  },
  plugins: [],
}