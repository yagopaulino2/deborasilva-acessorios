/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta extraída da logo
        vinho: { 950: "#1d0510", 900: "#2a0817", 800: "#3a0b21", 700: "#4c102d", 600: "#651a3d", 500: "#7e2a4e" },
        champagne: { 50: "#fbf1f3", 100: "#f7e3e8", 200: "#f3d6de", 300: "#e9bfca", 400: "#d9a1b0" },
        ouro: { 300: "#ecd08a", 400: "#dcb967", 500: "#c9a24b", 600: "#a98132", 700: "#7f5f22" },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
      },
      letterSpacing: { luxo: "0.28em" },
    },
  },
  plugins: [],
};
