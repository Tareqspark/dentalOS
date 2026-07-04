import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Trust blue — validated sequential ramp
        brand: {
          50: "#f0f6fe",
          100: "#dcebfc",
          200: "#b7d3f6",
          300: "#86b6ef",
          400: "#5598e7",
          500: "#2a78d6",
          600: "#256abf",
          700: "#1c5cab",
          800: "#184f95",
          900: "#104281",
          950: "#0d366b",
        },
        // AI violet accent
        ai: {
          100: "#e8e5fb",
          200: "#cfc9f6",
          300: "#b3abf1",
          400: "#9085e9",
          500: "#6d5ce0",
          600: "#5a49c9",
          700: "#4a3aa7",
          800: "#3a2d85",
          900: "#2c2364",
        },
        surface: {
          light: "#fcfcfb",
          page: "#f9f9f7",
          dark: "#1a1a19",
          darkpage: "#0d0d0d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        premium: "0 1px 2px rgba(11,11,11,.04), 0 8px 24px -8px rgba(13,54,107,.12)",
        "premium-lg": "0 2px 4px rgba(11,11,11,.04), 0 24px 64px -16px rgba(13,54,107,.18)",
        glow: "0 0 0 1px rgba(42,120,214,.15), 0 8px 40px -8px rgba(42,120,214,.35)",
        "glow-ai": "0 0 0 1px rgba(109,92,224,.2), 0 8px 40px -8px rgba(109,92,224,.4)",
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-ring": "pulse-ring 3.2s cubic-bezier(0.2,0.6,0.35,1) infinite",
        shimmer: "shimmer 2.6s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.7)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
