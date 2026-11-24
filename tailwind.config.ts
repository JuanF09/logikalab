import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#075FFF",
          "blue-light": "#075FFF",
          "blue-dark": "#075FFF",
          "blue-deep": "#000000",
          "blue-glow": "rgba(7, 95, 255, 0.45)",
          white: "#FFFFFF",
          black: "#000000",
          gray: "#B4B4B4",
        },
        surface: {
          base: "#000000",
          deep: "#000000",
          card: "#000000",
          "card-hover": "#000000",
          border: "rgba(7, 95, 255, 0.3)",
          "border-active": "#075FFF",
          "border-subtle": "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "Inter Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        display: [
          "var(--font-inter)",
          "Inter Display",
          "Inter",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "var(--font-inter)",
          "Inter",
          "JetBrains Mono",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        widest: "0.18em",
      },
      boxShadow: {
        "glow-sm": "0 0 20px -3px rgba(7, 95, 255, 0.5)",
        "glow-md": "0 0 35px -2px rgba(7, 95, 255, 0.65)",
        "glow-lg": "0 0 70px -5px rgba(7, 95, 255, 0.8)",
        "glow-card": "0 10px 40px -10px rgba(7, 95, 255, 0.3)",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(135deg, #075FFF 0%, #000000 100%)",
        "radial-spotlight": "radial-gradient(circle at 50% 0%, rgba(7, 95, 255, 0.35) 0%, transparent 70%)",
        "radial-hero": "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(7, 95, 255, 0.45), transparent 75%)",
        "ambient-mesh": "radial-gradient(at 0% 0%, rgba(7, 95, 255, 0.22) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(7, 95, 255, 0.18) 0px, transparent 50%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "border-beam": "border-beam 4s linear infinite",
      },
      transitionTimingFunction: {
        "fluid": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.04)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
