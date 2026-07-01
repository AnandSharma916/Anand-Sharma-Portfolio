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
        // Editorial brutalist palette — warm paper + hard ink + electric accents
        bone: "#F2EEE3",
        "bone-2": "#E8E3D5",
        "bone-3": "#DBD5C4",
        ink: "#141311",
        "ink-2": "#26241F",
        lime: {
          DEFAULT: "#CCFF00",
          deep: "#A6D400",
        },
        cobalt: {
          DEFAULT: "#2B2BFF",
          soft: "#5B5BFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.055em",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee 32s linear infinite reverse",
        "marquee-fast": "marquee 18s linear infinite",
        "spin-slow": "spin 16s linear infinite",
        "spin-slower": "spin 34s linear infinite",
        float: "float 7s ease-in-out infinite",
        blink: "blink 1.1s steps(2, start) infinite",
        "shine": "shine 2.4s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shine: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
