"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MonitorSmartphone, Database, Sparkles } from "lucide-react";
import { skills } from "@/lib/data";
import SectionHeading from "./SectionHeading";

// One accent per category, keyed to the order of `skills` in lib/data.
// 0 Frontend (iris) · 1 Backend & Databases (fern) · 2 Tools & AI (flame)
const accents = [
  {
    dot: "#c084fc",
    glow: "168,85,247",
    grad: "linear-gradient(90deg, #a855f7, #c084fc)",
    Icon: MonitorSmartphone,
    blurb: "Interfaces that feel fast, fluid and alive.",
    related: ["HTML5", "CSS3", "Responsive UI", "React Router", "Context API"],
  },
  {
    dot: "#6d7cff",
    glow: "109,124,255",
    grad: "linear-gradient(90deg, #4f5bd5, #6d7cff)",
    Icon: Database,
    blurb: "APIs and data layers that stay reliable at scale.",
    related: ["Mongoose", "CRUD APIs", "Schema Design", "Auth Flows"],
  },
  {
    dot: "#5b7cfa",
    glow: "91,124,250",
    grad: "linear-gradient(90deg, #4f5bd5, #818cf8)",
    Icon: Sparkles,
    blurb: "Shipping, automation and AI-assisted flow.",
    related: ["VS Code", "Chrome DevTools", "npm", "GitHub Actions"],
  },
];

// Secondary tools — real breadth, kept quiet so the meters stay the focus.
const extras = [
  "Next.js", "Redux Toolkit", "React Hooks", "REST APIs", "JWT", "PHP",
  "Bootstrap", "jQuery", "Framer Motion", "Docker", "Figma", "Vercel", "Netlify",
];

function Meter({ name, level, accent, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ delay: inView ? 0.05 + i * 0.07 : 0, duration: 0.4, ease: "easeOut" }}
      className="group/row"
    >
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="min-w-0 font-display text-sm font-semibold text-ink transition-colors group-hover/row:text-ink xs:text-[15px]">
          {name}
        </span>
        <span className="shrink-0 font-mono text-xs tabular-nums text-ink-muted transition-colors group-hover/row:text-ink-muted">
          {level}%
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={
            inView
              ? { delay: 0.12 + i * 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.25, ease: "easeIn" }
          }
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: accent.grad, boxShadow: `0 0 14px rgba(${accent.glow},0.55)` }}
        >
          {/* travelling sheen */}
          <span className="absolute inset-0 animate-shimmer rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] bg-[length:200%_100%]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const accent = accents[active];
  const cat = skills[active];

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const stRef = useRef(null);
  // Mirrors `active` so the scroll handler can bail without re-rendering.
  const activeRef = useRef(0);

  // Desktop: pin the grid and hand the category selection over to scroll —
  // one viewport-ish of travel per category. Pinning is limited to lg and up,
  // where the two-column layout actually fits a viewport; below that (or with
  // reduced motion, or on a viewport too short for the grid) nothing is pinned
  // and the cards stay plain click targets.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const grid = gridRef.current;
        if (!grid) return;
        // A pinned element taller than the viewport can never be read in full.
        if (grid.offsetHeight > window.innerHeight * 0.94) return;

        stRef.current = ScrollTrigger.create({
          trigger: grid,
          start: "center center",
          end: () => `+=${(skills.length - 1) * window.innerHeight * 0.5}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.min(skills.length - 1, Math.floor(self.progress * skills.length));
            if (i !== activeRef.current) {
              activeRef.current = i;
              setActive(i);
            }
          },
        });

        return () => {
          stRef.current = null;
        };
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 600);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  // Clicking a card still works: while pinned it scrolls to that card's slice
  // of the pinned range, which lets the ScrollTrigger drive the switch.
  const select = (i) => {
    const st = stRef.current;
    if (!st) {
      activeRef.current = i;
      setActive(i);
      return;
    }
    // Aim at the middle of slice i so we land clear of the boundaries.
    const p = (i + 0.5) / skills.length;
    window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: "smooth" });
  };

  // cursor spotlight on the right panel
  const panelRef = useRef(null);
  // once: false — meters refill every time the panel scrolls back into view
  const inView = useInView(panelRef, { margin: "-15% 0px -15% 0px" });
  const onMove = (e) => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="skills" ref={sectionRef} className="section-pad relative z-10">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="A toolkit honed across the full stack."
        subtitle="Technologies I reach for to design, build, and ship products that scale."
      />

      <div ref={gridRef} className="grid gap-4 lg:grid-cols-12 lg:gap-6 3xl:gap-8">
        {/* ── Category selector ── */}
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 xs:-mx-5 xs:px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:col-span-5 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
          {skills.map((s, i) => {
            const a = accents[i];
            const on = i === active;
            return (
              <button
                key={s.category}
                onClick={() => select(i)}
                aria-pressed={on}
                className={`group relative min-w-[13rem] flex-1 shrink-0 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 xs:min-w-[13.5rem] xs:p-5 lg:min-w-0 lg:shrink ${
                  on
                    ? "border-white/[0.12] bg-white/[0.05]"
                    : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.04]"
                }`}
              >
                {/* accent wash + left rail when active */}
                <span
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: on ? 1 : 0,
                    background: `radial-gradient(340px circle at 0% 0%, rgba(${a.glow},0.16), transparent 70%)`,
                  }}
                />
                <span
                  className="absolute inset-y-3 left-0 w-[3px] rounded-full transition-all duration-300"
                  style={{ background: a.grad, opacity: on ? 1 : 0, transform: on ? "scaleY(1)" : "scaleY(0.3)" }}
                />
                <div className="relative flex items-start gap-3.5">
                  <span
                    className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300"
                    style={{
                      background: on ? a.grad : "rgba(255,255,255,0.06)",
                      boxShadow: on ? `0 8px 22px -6px rgba(${a.glow},0.7)` : "none",
                    }}
                  >
                    <a.Icon size={18} className={on ? "text-white" : "text-ink-muted"} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[15px] font-bold text-ink xs:text-[1rem]/[1.5rem]">{s.category}</h3>
                      <span className="font-mono text-[12px] text-ink-soft">{String(s.items.length).padStart(2, "0")}</span>
                    </div>
                    <p className={`mt-1 text-[13px] leading-snug transition-colors duration-300 ${on ? "text-ink-muted" : "text-ink-soft"}`}>
                      {a.blurb}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}

          {/* ── Also fluent in ── */}
          <div className="mt-1 hidden shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 lg:block">
            <p className="kicker mb-3">Also fluent in</p>
            <div className="flex flex-wrap gap-2">
              {extras.map((t) => (
                <span
                  key={t}
                  className="cursor-default rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[12px] text-ink-muted transition-colors duration-200 hover:border-white/[0.18] hover:text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Proficiency panel ── */}
        <div
          ref={panelRef}
          onMouseMove={onMove}
          className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-panel/40 p-4 backdrop-blur-sm xs:p-6 sm:p-8 lg:col-span-7 3xl:p-10"
        >
          {/* cursor-follow glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70 transition-colors"
            style={{ background: `radial-gradient(300px circle at var(--mx,70%) var(--my,0%), rgba(${accent.glow},0.13), transparent 70%)` }}
          />

          <div className="relative flex flex-1 flex-col">
            <div className="mb-6 flex items-center gap-2.5 sm:mb-7">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent.dot, boxShadow: `0 0 12px ${accent.dot}` }} />
              <AnimatePresence mode="wait">
                <motion.h3
                  key={cat.category}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-lg font-bold text-ink"
                >
                  {cat.category}
                </motion.h3>
              </AnimatePresence>
              <span className="ml-auto shrink-0 font-mono text-xs text-ink-soft">
                avg {Math.round(cat.items.reduce((s, x) => s + x.level, 0) / cat.items.length)}%
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={cat.category} className="space-y-5">
                {cat.items.map((it, i) => (
                  <Meter key={it.name} name={it.name} level={it.level} accent={accent} i={i} inView={inView} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ── Related banner ── takes up the slack under the meters so the
                panel reads level with the taller selector column. */}
            <div className="mt-auto pt-8">
              <div className="mb-3 flex items-center gap-3">
                <p className="kicker">Related</p>
                <span className="h-px flex-1 bg-white/[0.08]" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-wrap gap-1.5"
                >
                  {accent.related.map((t) => (
                    <span
                      key={t}
                      className="cursor-default rounded-md border px-2 py-[3px] font-mono text-[11px] text-ink-muted transition-colors duration-200 hover:text-ink"
                      style={{
                        borderColor: `rgba(${accent.glow},0.30)`,
                        background: `rgba(${accent.glow},0.10)`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Also fluent in — mobile placement */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 xs:p-5 lg:hidden">
          <p className="kicker mb-3">Also fluent in</p>
          <div className="flex flex-wrap gap-2">
            {extras.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[12px] text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
