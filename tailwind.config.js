/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bento dark base — deep slate panels; accents use Tailwind's
        // built-in indigo / violet / emerald / rose / amber / cyan.
        base: "#0A0C11",
        panel: "#12151D",
        "panel-2": "#171C27",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slower": "spin 30s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        blink: "blink 1.1s steps(2, start) infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee 32s linear infinite reverse",
        "border-spin": "border-spin 6s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.75" },
        },
        "border-spin": {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
      },
    },
  },
  plugins: [],
};
