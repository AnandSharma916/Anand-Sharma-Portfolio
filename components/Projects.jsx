"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Code2, Star } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const accents = [
  { from: "#a855f7", to: "#7e22ce", solid: "#c084fc" },
  { from: "#5b7cfa", to: "#4f5bd5", solid: "#7c93ff" },
  { from: "#6d7cff", to: "#818cf8", solid: "#818cf8" },
  { from: "#818cf8", to: "#5b7cfa", solid: "#9aa8ff" },
  { from: "#7e22ce", to: "#26204e", solid: "#a855f7" },
  { from: "#6d7cff", to: "#a855f7", solid: "#a78bfa" },
  { from: "#c084fc", to: "#9333ea", solid: "#d8b4fe" },
  { from: "#a855f7", to: "#6d7cff", solid: "#c084fc" },
  { from: "#818cf8", to: "#4f5bd5", solid: "#8ea0ff" },
];

// Self-contained SVG placeholder that mimics a project screenshot using the
// row's accent gradient — no external image host required.
function placeholderImage(a, label) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a.from}'/>
      <stop offset='1' stop-color='${a.to}'/>
    </linearGradient>
  </defs>
  <rect width='800' height='500' fill='url(#g)'/>
  <rect width='800' height='500' fill='rgba(13,10,26,0.32)'/>
  <g opacity='0.92'>
    <rect x='64' y='62' width='672' height='352' rx='18' fill='rgba(255,255,255,0.10)' stroke='rgba(255,255,255,0.35)' stroke-width='1.5'/>
    <line x1='64' y1='106' x2='736' y2='106' stroke='rgba(255,255,255,0.28)' stroke-width='1.5'/>
    <circle cx='92' cy='84' r='6' fill='#ff5f57'/>
    <circle cx='114' cy='84' r='6' fill='#febc2e'/>
    <circle cx='136' cy='84' r='6' fill='#28c840'/>
    <rect x='110' y='158' width='210' height='160' rx='12' fill='rgba(255,255,255,0.22)'/>
    <circle cx='166' cy='206' r='16' fill='rgba(255,255,255,0.85)'/>
    <path d='M116 318 L188 246 L238 292 L296 232 L314 318 Z' fill='rgba(255,255,255,0.6)'/>
    <rect x='360' y='160' width='260' height='18' rx='9' fill='rgba(255,255,255,0.5)'/>
    <rect x='360' y='198' width='320' height='14' rx='7' fill='rgba(255,255,255,0.32)'/>
    <rect x='360' y='228' width='280' height='14' rx='7' fill='rgba(255,255,255,0.32)'/>
    <rect x='360' y='258' width='214' height='14' rx='7' fill='rgba(255,255,255,0.32)'/>
    <rect x='360' y='294' width='130' height='30' rx='15' fill='rgba(255,255,255,0.4)'/>
  </g>
  <text x='400' y='458' text-anchor='middle' font-family='sans-serif' font-size='16' fill='rgba(255,255,255,0.72)' letter-spacing='1'>${label}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * How far a row slides in horizontally. The rows are full-bleed below md, so a
 * 36px offset parks them outside the viewport until they reveal — on a 300px
 * screen that is a visible sliver of cut-off card. Single-column widths get a
 * purely vertical reveal instead.
 */
function useSlideDistance() {
  const [x, setX] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setX(mq.matches ? 36 : 0);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return x;
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative z-10">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title="Selected work I'm proud of."
        subtitle="A mix of products, open-source, and experiments."
      />

      <div className="space-y-12 xs:space-y-16 md:space-y-24 3xl:space-y-32">
        {projects.map((p, i) => (
          <Project
            key={p.title}
            p={p}
            index={i}
            accent={accents[i % accents.length]}
          />
        ))}
      </div>
    </section>
  );
}

function Project({ p, index, accent }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-100px" });
  // Odd rows put the copy on the left and the screenshot on the right.
  const flip = index % 2 === 1;
  const dir = flip ? -1 : 1;
  const dx = useSlideDistance();

  const slide = (from) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: from, y: 24 },
    animate: inView ? { opacity: 1, x: 0, y: 0 } : {},
    transition: { duration: 0.65, ease: [0.21, 0.5, 0.27, 1] },
  });

  return (
    <article
      ref={ref}
      className="group grid items-center gap-6 xs:gap-7 md:grid-cols-12 md:gap-12 3xl:gap-16"
    >
      {/* ————— screenshot ————— */}
      <motion.a
        {...slide(dx * dir)}
        href={p.demo || "#"}
        {...(p.demo ? { target: "_blank", rel: "noreferrer" } : {})}
        aria-label={`${p.title} preview`}
        className={`glass grad-border relative block overflow-hidden !p-0 transition-transform duration-500 hover:-translate-y-1 md:col-span-7 ${
          flip ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
          {p.image ? (
            <Image
              src={p.image}
              alt={`${p.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1920px) 58vw, 1100px"
              className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={placeholderImage(accent, "Project Preview")}
              alt={`${p.title} preview`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          {p.featured && (
            <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/[0.18] bg-black/35 px-2.5 py-1 text-xs text-white backdrop-blur">
              <Star size={11} fill="currentColor" /> Featured
            </span>
          )}
        </div>
      </motion.a>

      {/* ————— copy ————— */}
      <motion.div
        {...slide(-dx * dir)}
        className={`md:col-span-5 ${flip ? "md:order-1" : "md:order-2"}`}
      >
        <div className="flex flex-wrap gap-1.5 xs:gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em]"
              style={{
                color: accent.solid,
                borderColor: `${accent.solid}55`,
                background: `${accent.solid}14`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="mt-4 font-display text-xl font-extrabold leading-tight tracking-tight text-ink xs:text-2xl md:text-3xl 3xl:text-4xl">
          {p.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-ink-muted xs:text-[1rem]/[1.5rem] 3xl:text-lg">{p.blurb}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ProjectLink href={p.demo} label="Live Demo" Icon={ArrowUpRight} />
          <ProjectLink href={p.source} label="Source" Icon={Code2} />
        </div>

        <span
          aria-hidden
          className="mt-6 block h-px w-16 origin-left scale-x-100 transition-transform duration-500 group-hover:scale-x-[2.5]"
          style={{ background: `linear-gradient(90deg, ${accent.solid}, transparent)` }}
        />
      </motion.div>
    </article>
  );
}

function ProjectLink({ href, label, Icon }) {
  return (
    <a
      href={href || "#"}
      {...(href ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group/link inline-flex items-center gap-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
    >
      {label}
      <Icon
        size={13}
        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      />
    </a>
  );
}
