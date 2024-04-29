/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "1/8": "12.5%",
        "1/10": "10%",
      },
      colors: {
        "purple-dark": "#4b0082",
        "purple": "#a855f7",
        "purple-light": "#e9d5ff",
        "blue-dark": "#1d4ed8",
        "blue":"#93c5fd",
        "blue-light":"#bfdbfe",
        "indigo-dark": "#312e81",
        "indigo":"#4338ca",
        "indigo-light": "#c7d2fe",
        "pink-dark": "#be185d",
        "pink": "#f9a8d4",
        "pink-light": "#fda4af",
        "red": "#ef4444",
        "red-dark": "#b91c1c",
        "red-light": "#fca5a5",
        "orange": "#f97316",
        "orange-dark": "#c2410c",
        "orange-light": "#fdba74",
        "yellow": "#ffc107",
        "yellow-dark": "#a16207",
        "yellow-light": "#fef08a",
        "green": "#a3e635",
        "green-dark": "#4d7c0f",
        "green-light": "#d9f99d",
        "teal": "#14b8a6",
        "teal-dark": "#115e59",
        "teal-light": "#99f6e4",
        "cyan": "#22d3ee",
        "cyan-dark": "#0e7490",
        "cyan-light": "#a5f3fc",
        

      },
    },
  },
  plugins: [],
};
