/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manga: {
          bg: '#0d0d1a',
          card: '#1a1a2e',
          border: '#2a2a45',
          red: '#e63946',
          orange: '#f4a261',
          purple: '#7b5ea7',
          text: '#e0e0f0',
          muted: '#8080a0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
