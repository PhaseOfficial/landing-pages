/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1b2121',  // Replace with your actual color value
        'primary-foreground': '#FFFFFF',  // Replace with your actual color value
        navigation: '#dfe0db',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      // Example custom utility
      addUtilities({
        '.custom-utility': {
          display: 'inline-block',
          padding: '0.5rem',
          backgroundColor: '#1b2121',
        },
      });
    }),
  ],
};
