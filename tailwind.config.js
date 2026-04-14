/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#b9e5c9',
          300: '#8dd4a8',
          400: '#5fbc83',
          500: '#2D5016',
          600: '#234010',
          700: '#1a300c',
          800: '#122008',
          900: '#0a1004',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#4A90E2',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          500: '#E67E22',
        },
      },
    },
  },
  plugins: [],
}

