/** @type {import('tailwindcss').Config} */
export default {
content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    ],
  theme: {
    fontFamily: {
        'sans': ['Montserrat', 'Avenir', 'Helvetica', 'sans-serif']
    },
    colors: {
        'black': '#252525',
        'white': '#FFFFFF'
      },
    extend: {
        zIndex: {
            'back': '-1',
        }
    },
  },
  plugins: [],
}

