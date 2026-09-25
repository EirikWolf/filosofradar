/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          darkest: '#03050e',
          DEFAULT: '#040714',
          card: '#080e22',
          light: '#0d1533',
        },
        star: {
          white: '#ffffff',
          dim: '#94a3b8',
          bright: '#e2e8f0',
        },
        gold: {
          dim: 'rgba(246, 200, 95, 0.25)',
          DEFAULT: '#f6c85f',
          bright: '#ffd79e',
        },
        cyan: {
          glow: '#67e8f9',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cinzel', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'sweep': 'rotate-sweep 10s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'rotate-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
