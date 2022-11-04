/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "linear-gradient(to top, transparent 0%, rgb(0, 0, 0, 0.3) 50%), url('/home.jpeg')",
      },
      transitionProperty: {
        width: "width",
      },
      // custom user configuration
      bgGradientDeg: {
        90: "90deg", // bg-gradient-10
        180: "180deg",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
