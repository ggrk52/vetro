/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF2500',
          hover: '#e02000',
          soft: 'rgba(255, 37, 0, 0.08)',
          glow: 'rgba(255, 37, 0, 0.25)',
        },
        ink: {
          DEFAULT: '#1a1712',
          2: '#14141a',
          dim: 'rgba(20, 20, 22, 0.65)',
        },
        paper: {
          DEFAULT: '#f4f2ec',
          2: '#eae6dc',
          card: '#ffffff',
          line: 'rgba(26, 23, 18, 0.1)',
          lineHover: 'rgba(26, 23, 18, 0.2)',
          muted: '#7c766c',
        },
        brand: {
          dark: '#1a1712',
          navy: '#22201c',
          accent: '#FF2500',
          accentHover: '#e02000',
          gold: '#c5a880',
          goldLight: '#fbf7ee',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Inter Tight"', 'Manrope', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        'pill': '100px',
        'r': '26px',
        'rlg': '36px',
      },
      boxShadow: {
        'subtle': '0 4px 16px -6px rgba(30, 28, 24, 0.12)',
        'elevated': '0 20px 50px -20px rgba(38, 34, 28, 0.22)',
        'card': '0 2px 10px -2px rgba(26, 23, 18, 0.05)',
      }
    },
  },
  plugins: [],
}
