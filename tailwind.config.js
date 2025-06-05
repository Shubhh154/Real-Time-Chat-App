import daisyui from "daisyui";
// import themes from "daisyui/theme/object";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite', // default is 1s
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"]
  }
} 