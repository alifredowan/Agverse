/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ag: {
          teal: '#ACD5D1',
          'teal-light': '#D4EBE9',
          'teal-subtle': '#ACD5D118',
          dark: '#021312',
          'dark-loam': '#06201D',
          'dark-surface': '#0A2B27',
          'dark-elevated': '#0F3833',
          chlorophyll: '#2CC56F',
          wheat: '#E4D5BE',
          muted: '#96B1AC',
          border: 'rgba(172, 213, 209, 0.16)',
          'border-strong': 'rgba(172, 213, 209, 0.35)'
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        marcellus: ['Marcellus', 'serif'],
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
