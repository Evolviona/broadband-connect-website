/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bc-dark-bg': '#1C1C1C',
        'bc-dark-text': '#E0E0E0',
        'bc-light-bg': '#FAFAF7',
        'bc-light-text': '#1C1C1C',
        'bc-primary': '#0B8FE5',
        'bc-secondary': '#FB8686',
        'bc-accent-deep-red': '#8B0000',
        'bc-accent-deep-blue': '#37356A',
        'bc-accent-crimson': '#DC143C',
        'bc-accent-royal-blue': '#4169E1'
      },
      fontFamily: {
        'playfair': ['Playfair Display SC', 'serif'],
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}