const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-beige': 'rgba(244, 239, 228, 1)',
        'brand-brown': 'rgba(184, 159, 143, 1)',
        'brand-dark': 'rgb(27, 35, 49)',
        'brand-gray': {
          DEFAULT: 'rgba(147, 147, 147, 1)', 
          light: 'rgba(239, 239, 239, 1)',
        },
      },
      fontFamily: {
        'display': ['"hastegi-yybye"', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
        'script': ['"Peachy-Flightone-Script-BF65b9cf3d5461e"', 'cursive'],
        'serif': ['Cormorant', 'serif'],
        'mono': ['"Roboto Mono"', 'monospace'], 
      },
      fontSize: {
        '7xl': '5rem',  
        '6xl': '4rem',  
      },
      borderRadius: {
        'card': '8px',
        'modal': '14px',
      },
      boxShadow: {
        'card': '0 3px 11px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
});