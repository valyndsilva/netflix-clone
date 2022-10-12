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
    },
  },
  plugins: [],
};
