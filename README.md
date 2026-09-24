# Anand Sharma — Portfolio

A cool, modern, animated personal portfolio built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- **Animated hero** with rotating role text, live "available" badge, and animated stat counters
- **Aurora background** with floating gradient orbs, a subtle grid overlay, and a cursor-following glow
- **Scroll-reveal animations** throughout, powered by Framer Motion
- **Glassmorphism** cards and a sticky, blur-on-scroll navbar with a mobile menu
- Sections: **About**, **Skills** (animated bars), **Experience** (timeline), **Projects** (interactive grid), **Education + Certifications**, **Testimonials**, and a bold **Contact** CTA
- Infinite **tech-stack marquee**
- Fully **responsive** and dark-themed

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🛠 Customize

All content lives in **`lib/data.js`** — edit the mock data (name, roles, skills, experience, projects, education, etc.) to make it yours. Colors and animations live in `tailwind.config.js` and `app/globals.css`.

## 📦 Build

```bash
npm run build
npm start
```

## 🔄 CI / CD Pipeline

Continuous Integration and Continuous Deployment is configured via **GitHub Actions**:
- **CI Workflow**: [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) automatically runs dependency verification, Next.js cache restoration, and production builds on pushes and pull requests.
- **CD Deployment**: Automatically deploys to Vercel upon merging to `main`/`master` (or manual trigger).
- **GitHub Pages**: Optional static export workflow available at [`.github/workflows/deploy-gh-pages.yml`](.github/workflows/deploy-gh-pages.yml).
- See the complete [CI/CD Guide](docs/CI_CD_GUIDE.md) for configuration instructions.

## 🧱 Stack

- Next.js 14 (App Router)
- Tailwind CSS 3
- Framer Motion
- lucide-react icons

