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
          highlight: "var(--color-highlight)",
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          background: "var(--color-background)",
        },
        "french-gray": "#D1D1D6",
        "slate-blue": "#507080",
        "slate-gray": "#2F4A4D",
        "rain-forest": "#00735E",
        "oslo-gray": "#8E8E93",
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
      spacing: {
        inherit: "inherit",
        3.75: "0.9375rem",
        4.1: "1.0625rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        12.25: "3.0625rem",
        15: "3.75rem",
        17: "4.375rem",
        18: "4.5rem",
        22.5: "5.625rem",
        25: "6.25rem",
        38: "9.5rem",
        86: "21.5rem",
        87.5: "21.875rem",
      },
      height: {
        inherit: "inherit",
        footer: "var(--footer-height)",
        "footered-page": "var(--footered-page-height)",
      },
      minHeight: {
        inherit: "inherit",
        15: "3.75rem",
        17: "4.375rem",
        22.5: "5.625rem",
      },
      maxWidth: {
        inherit: "inherit",
        15: "3.75rem",
        22.5: "5.625rem",
      },
      minWidth: {
        inherit: "inherit",
        87.5: "21.875rem",
      },
      lineHeight: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        8.5: "2.125rem",
      },
      letterSpacing: {
        "tight-2": "-0.02em",
        "tight-2-percent": "-2%",
      },
      fontSize: {
        xxs: "0.625rem",
      },
    },
  },
};

export default config;
