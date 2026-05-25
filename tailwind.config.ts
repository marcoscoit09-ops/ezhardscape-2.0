import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        schibsted: ["var(--font-schibsted)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        noto: ["var(--font-noto)", "sans-serif"],
        fustat: ["var(--font-fustat)", "sans-serif"],
      },
      colors: {
        background: "#f8f8f8",
        foreground: "#000000",
        secondary: "#505050",
        accent: "#0e1311",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
