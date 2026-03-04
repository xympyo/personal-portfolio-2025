/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#F7F5F2',
        text: '#0F0F0F',
        dark: '#1A1A1A',
        accent: '#C8470D',
        border: '#E8E4DF',
        muted: '#6B6560',
        surface: 'rgba(255,255,255,0.6)',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Geist"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
        prose: '680px',
      },
      fontSize: {
        body: ['16px', { lineHeight: '1.7' }],
      },
    },
  },
  plugins: [],
};
