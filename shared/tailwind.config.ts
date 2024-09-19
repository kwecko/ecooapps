import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./.shared/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          default: "var(--color-default)",
          "home-bg": "var(--color-home-background)",
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          background: "var(--color-background)",
        },
        "french-gray": "#D1D1D6",
        "slate-blue": "#507080",
        "slate-gray": "#2F4A4D",
        "rain-forest": "#00735E",
        eucalyptus: "#43DBAB",
        caramel: "#FFDD92",
        "battleship-gray": "#979797",
        "outer-space": "#3E5055",
        "blanched-almoad": "#FFEDCC",
        platinum: "#EAE7E3",
        "walnut-brown": "#4F4743",
        error: "#FF7070",
        "ghost-white": {
          base: "#FAFCFF",
          100: "#FAFCFF",
          200: "#D8DADD", // this is intentional
          300: "#D8DADD",
          400: "#B7B8BA",
          500: "#959698",
          600: "#737475",
          700: "#515253",
          800: "#303030",
          900: "#0E0E0E",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans"],
        inter: ["Inter", "sans"],
      },
    },
  },
};

export default config;
