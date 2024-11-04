/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        calistoga: ['Calistoga', 'serif'],
        dancing: ['Dancing Script', 'cursive'],
        playfair: ['Playfair Display', 'serif'],
        prata: ['Prata', 'serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        floralwhite: '#FFFAF0',
        lavenderblush: '#FFF0F5',
        seashell: '#FFF5EE'
      },
    },
  },
  plugins: [],
}

