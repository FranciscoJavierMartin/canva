/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // TODO: Reestructure colors
      colors: {
        black: '#18191b',
        'mid-black': '#212223',
        'light-black': '#252627',
        'darker-gray': '#313030',
        'dark-gray': '#3c3c3d',
        'mid-gray': '#aca9a9',
        'light-gray': '#c7c5c5',
        'lighter-gray': '#e0dddd',
        malva: '#7482f6',
        'dark-purple': '#552ab8',
        'purple-bright': '#a855f7',
        'light-purple': '#8b3dff',
        'blue-dark': '#4c76cf',
        'blue-steel': '#34569f',
        'off-blue': '#32769ead',
        green: '#1e830f',
      },
    },
  },
  plugins: [],
};
