/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/.vitepress/theme/**/*.{vue,js,ts,jsx,tsx,css}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        "2xl": "1440px",
        "3xl": "1536px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}

