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
          50: '#e6f2f2',
          100: '#cce6e6',
          200: '#99cccc',
          300: '#66b3b3',
          400: '#339999',
          500: '#1a4d4d',
          600: '#163d3d',
          700: '#112e2e',
          800: '#0d2020',
          900: '#081111',
        },
        secondary: {
          50: '#f5e6f2',
          100: '#ebcce6',
          200: '#d799cc',
          300: '#c366b3',
          400: '#af3399',
          500: '#7a2d5f',
          600: '#62244c',
          700: '#491b39',
          800: '#311226',
          900: '#180913',
        },
        accent: {
          50: '#fef2f8',
          100: '#fde6f1',
          200: '#fbcce3',
          300: '#f9b3d5',
          400: '#f799c7',
          500: '#7a2d5f',
          600: '#c24d8f',
          700: '#a03d73',
          800: '#7e2e57',
          900: '#5c1e3b',
        },
      },
    },
  },
  plugins: [],
}

