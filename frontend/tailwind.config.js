/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all files in src for Tailwind classes
  ],
  theme: {
    extend: {
      // Add your custom colors, fonts, or spacing here
      colors: {
        'brand-blue': '#1fb6ff',
      },
    },
  },
  plugins: [],
}