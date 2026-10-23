/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060912',
        night: '#0a0f1c',
        panel: '#0e1526',
        line: '#1c2740',
        dim: '#a7b2c8',
        mute: '#6c7a95',
        cyan: '#2fd3ff',
        blue: '#4d86ff',
        discord: { DEFAULT: '#5865f2', dark: '#4752c4' },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
