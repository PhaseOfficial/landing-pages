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
  plugins: [],
}

 