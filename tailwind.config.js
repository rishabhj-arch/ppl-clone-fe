/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "serif"],
      },
      screens: {
        tab: "981px",
        lg: "1025px",
        min_xl: "1441px",
        mb:"431px",
        itab: "980px"
      },
      boxShadow: {
        custom: "0px 2px 20px 0px #0000000D", 
      },
    },
  },
  plugins: [],
};
