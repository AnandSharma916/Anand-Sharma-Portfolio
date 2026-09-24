/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Default Tailwind stops (sm 640 … 2xl 1536) plus two wide-desktop tiers
      // so 1920px and 2560px monitors get their own layout step instead of
      // stalling at the 2xl container width. `xs` covers 320–380px handsets.
      screens: {
        xs: "380px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      colors: {
        // NOTE: `base` doubles as a font-size key, so `text-base` is ambiguous —
        // Tailwind emits it as BOTH `font-size: 1rem` and `color: #0a0a10`, and
        // the colour wins in any breakpoint variant (media queries come last),
        // turning text near-black. Use `text-[1rem]` for the size instead.
        //
        // Midnight palette — near-black surfaces, white ink text,
        // blue (primary) + purple (structural) accents.
        base: "#0a0a10",
        panel: "#14141f",
        "panel-2": "#1c1c2b",
        line: "rgba(255,255,255,0.10)",

        // Readable ink hierarchy for text on dark surfaces (light -> faint).
        // Contrast vs base (#0a0a10): 15.9 / 12.0 / 8.2 / 5.0 — all pass WCAG AA.
        ink: {
          DEFAULT: "#f3f4f8", // primary text / headings
          muted: "#c8ccd8", // secondary text / body copy
          soft: "#a4a9b8", // small meta / labels
          faint: "#7c8194", // lowest tier, still legible
        },

        // Palette families (100 = darkest -> 900 = lightest), hues re-pointed.
        // flame -> blue (primary accent)
        flame: {
          DEFAULT: "#5b7cfa", 100: "#0f1a45", 200: "#1a2a6b", 300: "#2b3f9e",
          400: "#4055cc", 500: "#5b7cfa", 600: "#7c93ff", 700: "#9db0ff",
          800: "#c2d0ff", 900: "#e4ebff",
        },
        // fern -> indigo blend (secondary accent)
        fern: {
          DEFAULT: "#6d7cff", 100: "#141653", 200: "#232a7a", 300: "#3540a8",
          400: "#4f5bd5", 500: "#6d7cff", 600: "#8f9cff", 700: "#b0bbff",
          800: "#d0d7ff", 900: "#eaeeff",
        },
        // iris -> purple (structural accent)
        iris: {
          DEFAULT: "#a855f7", 100: "#2e0a52", 200: "#4a1080", 300: "#6b21a8",
          400: "#8b2fd6", 500: "#a855f7", 600: "#bb77f9", 700: "#cd9bfb",
          800: "#dfc0fc", 900: "#f0e2fe",
        },
        // ghost -> light grays (near-white foreground)
        ghost: {
          DEFAULT: "#f3f4f8", 100: "#1a1a22", 200: "#2b2b36", 300: "#4a4b57",
          400: "#6b6d7b", 500: "#9a9dac", 600: "#c2c4cf", 700: "#d8dae1",
          800: "#e9eaef", 900: "#f7f8fb",
        },

        // Conventional Tailwind order (50 light -> 900 dark).
        // blue -> blue
        blue: {
          50: "#eef2ff", 100: "#dbe3ff", 200: "#c2d0ff", 300: "#9db0ff",
          400: "#7c93ff", 500: "#5b7cfa", 600: "#4f6ef5", 700: "#4055cc",
          800: "#2b3f9e", 900: "#1a2a6b",
        },
        // pink -> purple
        pink: {
          50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe",
          400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce",
          800: "#6b21a8", 900: "#581c87",
        },
        // green -> indigo blend
        green: {
          50: "#eef0ff", 100: "#dfe3ff", 200: "#c7ccff", 300: "#a9b2ff",
          400: "#8f9cff", 500: "#6d7cff", 600: "#5561e8", 700: "#4f5bd5",
          800: "#3540a8", 900: "#232a7a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 26s linear infinite",
        "spin-slower": "spin 40s linear infinite",
        "gradient-x": "gradient-x 7s ease infinite",
        float: "float 7s ease-in-out infinite",
        "glow-pulse": "glow-pulse 5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
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
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
