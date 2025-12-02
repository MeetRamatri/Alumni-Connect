/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",  // Blue
        secondary: "#1e3a8a", // Darker Blue
      },
    },
  },
  plugins: [],
};
