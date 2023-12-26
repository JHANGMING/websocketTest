/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "12px",
    },
    extend: {
      colors: {
        room: {
          DEFAULT: "#fff",
          primaryGreen: "#38470B",
          secondaryGreen: "#949C7C",
          primaryGray:"#707070",
          secondaryGray: "#6A6A6A",
          thirdGray:"#00000029",
          primaryWhite:"#0000000A",
          secondaryWhite: "#FFFFFF00",
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "1366px",
        },
      });
    },
  ],
}


