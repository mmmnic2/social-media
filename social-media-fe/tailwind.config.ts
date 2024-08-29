/* eslint-disable import/no-default-export */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e0a2a2",
        secondary: "#edb9b8",
        dark: "hsl(252, 30%, 17%)",
        light: "hsl(252, 30%, 95%)",
        gray: "hsl(252, 15%, 50%)",
        "dark-gray": "hsl(252, 15%, 30%)",
        background: "#f7cac9",
        danger: "hsl(0, 95%, 65%)",
        success: "hsl(120, 95%, 65%)",
        "text-primary": "#794a4b",
        "light-background": "#fdecea",
        "accent-color": "#d88589",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "custom-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      },
      borderRadius: {
        card: "1rem",
        lg: "2rem",
      },
      padding: {
        btn: "0.6rem 2rem",
        search: "0.6rem 1rem",
        card: "1rem",
      },
      inset: {
        "sticky-top-left": "5.4rem",
        "sticky-top-right": "-18rem",
      },
      zIndex: {
        "10000": "10000",
      },
    },
  },
  plugins: [],
};
export default config;
