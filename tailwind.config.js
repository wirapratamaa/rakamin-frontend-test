/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#01959F",
        secondary: "#FEEABC",
        danger: "#F5B1B7",
        success: "#B8DBCA",
        neutral: "#E0E0E0",
      },
      backgroundColor: {
        primary: "#F7FEFF",
        secondary: "#FFFCF5",
        danger: "#FFFAFA",
        success: "#F8FBF9",
        neutral: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
