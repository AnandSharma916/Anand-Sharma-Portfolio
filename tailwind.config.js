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
        // Warm Sunset palette — espresso night + amber/coral/peach glow
        espresso: "#171012",
        "espresso-2": "#211619",
        "espresso-3": "#2C1E22",
        cream: "#F3E7DA",
        amber: {
          DEFAULT: "#FF9E5E",
          soft: "#FFB884",
        },
        coral: {
          DEFAULT: "#FF5E7E",
          soft: "#FF89A0",
        },
        peach: "#FFC98B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "spin-slower": "spin 34s linear infinite",
        blob: "blob 22s ease-in-out infinite",
        "glow-pulse": "glow-pulse 5s ease-in-out infinite",
        shimmer: "shimmer 2.6s linear infinite",
        blink: "blink 1.1s steps(2, start) infinite",
        marquee: "marquee 34s linear infinite",
        "marquee-reverse": "marquee 34s linear infinite reverse",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
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
        blob: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
            borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%",
          },
          "33%": {
            transform: "translate(40px, -50px) scale(1.12)",
            borderRadius: "60% 40% 33% 67% / 60% 35% 65% 40%",
          },
          "66%": {
            transform: "translate(-30px, 30px) scale(0.92)",
            borderRadius: "35% 65% 55% 45% / 55% 60% 40% 45%",
          },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
