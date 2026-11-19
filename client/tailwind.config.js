/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0B3D2E', // Primary deep forest green
          deep: '#06251C',
          dark: '#082E23',
          card: '#0E4434',
          light: '#135340',
        },
        lime: {
          DEFAULT: '#8BC34A', // Accent fresh lime
          hover: '#9CCC65',
          light: '#DCEDC8',
          glow: 'rgba(139, 195, 74, 0.4)',
        },
        sand: {
          DEFAULT: '#F5F1E8', // Light background sand
          light: '#FAF7F2',
          surface: '#EFEAE0',
          dark: '#DFD8CC',
        },
        charcoal: {
          DEFAULT: '#14201B', // Dark charcoal text/sections
          deep: '#0D1512',
          card: '#1B2C25',
          surface: '#223830',
        },
      },
      fontFamily: {
        heading: ['Sora', 'Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(11, 61, 46, 0.08)',
        'soft-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.35)',
        'glow-lime': '0 0 25px rgba(139, 195, 74, 0.3)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
