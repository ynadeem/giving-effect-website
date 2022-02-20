const { sortedIndexOf } = require("lodash");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-beige": "#ffffea",
        "primary-green-light": "#d1e2c4",
        "primary-green-dark": "#778a35",
        "primary-green-darkest": "#576527",
        "primary-pink": "#f1e3e9",
      },
      fontFamily: {
        lato: "'Lato', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
    },
  },
  plugins: [],
};
