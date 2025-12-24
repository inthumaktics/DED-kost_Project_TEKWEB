/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Kita tambahkan font standar industri modern
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", sans-serif],
      },
      // Kita definisikan warna brand utama (Emerald/Teal)
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Warna utama
          600: '#059669', // Warna saat di-hover
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      }
    },
  },
  plugins: [],
}