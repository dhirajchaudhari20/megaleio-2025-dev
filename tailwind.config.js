/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        netflixBlack: "#0B0203",
        netflixDeepRed: "#5B0A0E",
        netflixGlowRed: "#B11217",
        netflixSoftRed: "#7A0F14",
      },
      boxShadow: {
        netflixGlow: "inset 0 0 120px rgba(177, 18, 23, 0.15)",
      },
    },
  },
  plugins: [],
};
