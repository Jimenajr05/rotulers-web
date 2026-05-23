/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'rotulers-base': '#0A1628',
        'rotulers-primary': '#1E6FFF',
        'rotulers-accent': '#FFD100',
        'rotulers-bg': '#F4F6FA',
        'rotulers-white': '#FFFFFF',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
