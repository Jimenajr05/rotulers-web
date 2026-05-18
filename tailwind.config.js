/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'rotulers-blue': '#1B3A8A',
        'rotulers-gold': '#E9A800',
        'rotulers-gray': '#F5F5F5'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
