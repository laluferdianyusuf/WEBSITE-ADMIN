/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green-1": "#14B8A6",
        "custom-green-2": "#0D9485",
        "custom-blue-1": "#F1F5F9",
        "custom-white-1": "#F2F2F2",
        "custom-black-1": "#23272E",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
