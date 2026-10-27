/** @type {import('tailwindcss').Config} */
// Palette sampled from public/logo.png: navy space background, icy neon outline,
// periwinkle → violet wings, and the lavender-silver lettering.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080b19',
        night: '#0c1430',
        panel: '#101a3a',
        line: '#233160',
        frost: '#eeedfa',
        dim: '#b9c0dc',
        mute: '#7782a8',
        cyan: '#8fdfff',
        blue: '#5f82e0',
        wing: '#a3b4f0',
        violet: '#8b6cf0',
        discord: { DEFAULT: '#5865f2', dark: '#4752c4' },
      },
      fontFamily: {
        display: ['Teko', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['"Chakra Petch"', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
