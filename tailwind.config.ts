import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Share Tech Mono'", "monospace"],
        display: ["'Orbitron'", "monospace"],
      },
      keyframes: {
        "cell-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.92)" },
        },
        "ripple": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 4px rgba(251,191,36,0.3)" },
          "50%": { boxShadow: "0 0 16px rgba(251,191,36,0.8)" },
        },
        "zero-flash": {
          "0%": { backgroundColor: "rgba(34,197,94,0.4)" },
          "100%": { backgroundColor: "transparent" },
        },
        "scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "flicker": {
          "0%, 95%, 100%": { opacity: "1" },
          "96%": { opacity: "0.7" },
          "97%": { opacity: "1" },
          "98%": { opacity: "0.6" },
        },
      },
      animation: {
        "cell-pulse": "cell-pulse 0.15s ease-in-out",
        "ripple": "ripple 0.4s ease-out forwards",
        "shake": "shake 0.3s ease-in-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "zero-flash": "zero-flash 0.6s ease-out forwards",
        "scanline": "scanline 6s linear infinite",
        "flicker": "flicker 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
