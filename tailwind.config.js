/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        sans: ['var(--default-font-family)'],
      },
      fontSize: {
        'large': 'var(--text-large)',
        'medium': 'var(--text-medium)',
        'normal': 'var(--text-normal)',
        'small': 'var(--text-small)',
      },
    },
  },
  plugins: [],
} 