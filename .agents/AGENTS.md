# Anand Sharma Portfolio — Project Context

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- Lucide React icons

## Key Paths
- Education section: `components/Education.jsx`
- Static data (education, skills, etc.): `lib/data.js`
- Public assets: `public/`

## Education Section Notes
- Cards flip on **hover** (onMouseEnter/onMouseLeave), NOT on click.
- Each education entry in `lib/data.js` supports a `logo` (image path) and
  `logoClass` (Tailwind classes) field for per-university icon styling.
- University logos:
  - GGSIPU (MCA): `/ggsipu-logo.png` — `logoClass: "h-full w-full object-contain p-1 bg-white"`
  - Vikram University (BSc): `/vikram-university-logo.jpg` — same logoClass
- Icon container is a **circle** (`rounded-full`), h-14 w-14.

## Dev Server
- Runs on `npm run dev` in `c:\Users\abhinav\Desktop\Anand-Sharma-Portfolio`
