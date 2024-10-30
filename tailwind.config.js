/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: { "8xl": "1440px" },
      colors: { cushonPink: "#dc1e83" },
    },
  },
  plugins: [],
};
