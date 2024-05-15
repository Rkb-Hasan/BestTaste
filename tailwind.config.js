/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Permanent: '"Permanent Marker", cursive',
        exo: '"Exo", sans-serif',
      },
      borderImage: {
        "gradient-purple-blue": "linear-gradient(90deg, #D400FF, #00CCFF)", // Define your custom gradient
      },
    },
  },
  plugins: [require("daisyui")],
};
