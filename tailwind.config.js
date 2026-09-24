/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        titanium: {
          900: '#121417',
          800: '#1A1E24',
          700: '#262C36',
          100: '#E4E7EC'
        },
        gold: {
          accent: '#B89369',
          hover: '#9E7A52',
          light: '#F5EFE6'
        }
      }
    },
  },
  plugins: [],
}