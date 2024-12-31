/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#1b2121',  // Replace with your actual color value
        'primary-foreground': '#FFFFFF',  // Replace with your actual color value
        navigation: '#dfe0db',
      },
    },
  },
  plugins: [ plugin(function ({ addUtilities }) {
    addUtilities({
      '.text-shadow-sm': {
        textShadow: '1px 1px 2px rgb(252, 251, 251)',
      },
      '.text-shadow-md': {
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
      '.text-shadow-lg': {
        textShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)',
      },
      '.text-shadow-xl': {
        textShadow: '6px 6px 8px rgba(0, 0, 0, 0.5)',
      },
      '.text-shadow-none': {
        textShadow: 'none',
      },
    });
  }),
}

 