module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          800: "#181C20",
          900: "#0c0c0d",
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
