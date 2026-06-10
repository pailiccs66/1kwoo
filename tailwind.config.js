/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "#F9F7F2",
        foreground: "#2E2E2B",
        accent: "#D97757",
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: [
          '"Source Serif Pro"',
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.08)",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.32, 0, 0.67, 0)",
      },
    },
  },
  plugins: [],
};
