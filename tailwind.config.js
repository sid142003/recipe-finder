/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mint-green": "#43B5A0",
        "golden-yellow": "#FFD166",
        "sky-blue":"#3DA9FC",
        "warm-beige": "#F1E8D3",
        "off-white": "#F8F8F8",
        "charcoal-gray": "#2F2F2F",
        "alabaster": "#EDEEE6",
        "coral-red": "#F25454"
      }
    },
  },
  plugins: [],
}

