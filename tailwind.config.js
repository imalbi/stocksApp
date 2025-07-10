/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Controlla che questo file esista nella root del progetto
    './src/renderer/**/*.{js,ts,svelte}' // La parte più importante!
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
