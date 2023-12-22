module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary' : '#F2A22A',
        'secondary': '#ECD7B8',
        'top_color' : '#080521',
        'login_bg' : '#F4ECDF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
