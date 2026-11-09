/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // VETRO Architectural Glass Studio Design System
        ivory: {
          DEFAULT: '#F4F2EC',
          50: '#FAF9F6',
          100: '#F4F2EC',
          200: '#E8E5DD',
        },
        snow: '#FBFAF7',
        graphite: {
          DEFAULT: '#252725',
          light: '#323532',
          deep: '#1A1C1A',
        },
        sage: {
          DEFAULT: '#788173',
          hover: '#687163',
          light: '#8E9889',
          soft: 'rgba(120, 129, 115, 0.12)',
        },
        stone: {
          DEFAULT: '#D8D3C9',
          light: '#E5E1D8',
          dark: '#BDB7AA',
        },
        muted: {
          DEFAULT: '#777A74',
          light: '#91948E',
          dark: '#5E615B',
        },
        border: {
          DEFAULT: '#DFDDD6',
          subtle: '#ECEAE4',
          dark: 'rgba(37, 39, 37, 0.12)',
        },
        bronze: {
          DEFAULT: '#A68C70',
          hover: '#957C60',
          light: '#BAA287',
          soft: 'rgba(166, 140, 112, 0.12)',
        },

        // Backward compatibility mappings
        brand: {
          dark: '#252725',
          navy: '#1A1C1A',
          accent: '#788173',
          accentHover: '#687163',
          gold: '#A68C70',
          goldLight: '#FBFAF7',
        },
        ink: {
          DEFAULT: '#252725',
          2: '#1A1C1A',
          dim: 'rgba(37, 39, 37, 0.7)',
        },
        paper: {
          DEFAULT: '#F4F2EC',
          2: '#E8E5DD',
          card: '#FBFAF7',
          line: '#DFDDD6',
          lineHover: '#BDB7AA',
          muted: '#777A74',
        },
        orange: {
          DEFAULT: '#788173',
          hover: '#687163',
          soft: 'rgba(120, 129, 115, 0.12)',
          glow: 'rgba(120, 129, 115, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
        'pill': '9999px',
        'r': '4px',
        'rlg': '6px',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(37, 39, 37, 0.05)',
        'elevated': '0 12px 32px -12px rgba(37, 39, 37, 0.08)',
        'card': '0 1px 3px 0 rgba(37, 39, 37, 0.04)',
      },
      maxWidth: {
        'studio': '1280px',
        'editorial': '1320px',
      }
    },
  },
  plugins: [],
}
