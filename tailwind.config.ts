/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#18191b',
          light: '#252627',
          mid: '#212223',
        },
        gray: {
          darker: '#313030',
          dark: '#3c3c3d',
          mid: '#aca9a9',
          light: '#c7c5c5',
          lighter: '#e0dddd',
        },
        purple: {
          dark: '#552ab8',
          bright: '#a855f7',
          light: '#8b3dff',
          blue: '#7482f6',
        },
        blue: {
          dark: '#4c76cf',
          steel: '#34569f',
          off: '#32769ead',
        },
      },
    },
  },
  plugins: [],
};
