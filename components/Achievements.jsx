"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  Code2,
  Target,
  Trophy,
  Rocket,
  Medal,
  Award,
  Crown,
} from "lucide-react";
import { achievements, honors, testScores } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

// ── Category theming ───────────────────────────────────────
const CATS = {
  Milestone: { label: "Milestones", accent: "#a855f7", glow: "168,85,247" },
  Honor: { label: "Honors", accent: "#5b7cfa", glow: "91,124,250" },
  "Test Score": { label: "Test Scores", accent: "#6d7cff", glow: "109,124,255" },
};
const milestoneIcons = [Code2, Target, Crown, Rocket];

// Headline numbers for the animated stat strip.
const stats = [
  { value: "300+", label: "DSA problems solved", Icon: Code2 },
  { value: "812", prefix: "AIR ", label: "NIMCET 2023 rank", Icon: Trophy },
  { value: "50+", label: "Projects deployed", Icon: Rocket },
  {
    value: String(honors.length + testScores.length),
    label: "Honors & exams cleared",
    names: ["NTS", "NIMCET", "NDA", "Airforce", "Regional College Exam"],
    Icon: Award,
  },
];

// Wrap numeric tokens (300+, 812, 50+, 2023 …) in gradient text for punch.
function highlightNumbers(text) {
  return text.split(/(\d[\d,]*\+?)/g).map((part, i) =>
    /\d/.test(part) ? (
      <span key={i} className="gradient-text font-bold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// Pull a year out of the title/meta so entries can be plotted chronologically.
function parseYear(it) {
  const m = `${it.title} ${it.meta || ""}`.match(/\b(20\d{2})\b/);
  return m ? +m[1] : null;
}

// Unified recognition list, dated and sorted newest → oldest.
const items = [
  ...achievements.map((a, i) => ({
    id: `m-${i}`,
    cat: "Milestone",
    title: a,
    Icon: milestoneIcons[i % milestoneIcons.length],
  })),
  ...honors.map((h, i) => ({ id: `h-${i}`, cat: "Honor", Icon: Medal, ...h })),
  ...testScores.map((t, i) => ({
    id: `t-${i}`,
    cat: "Test Score",
    Icon: Target,
    ...t,
  })),
]
  .map((it) => {
    const y = parseYear(it);
    return { ...it, year: y, yearLabel: y ? String(y) : "Now", sortKey: y ?? Infinity };
  })
  .sort((a, b) => b.sortKey - a.sortKey);

const TABS = ["All", "Milestone", "Honor", "Test Score"];

// The horizontal line the spine fills to — nodes above it are "reached".
// Kept in one place so the fill and the dots can never drift apart.
const FILL_LINE = 0.65;

// True once this element's top has crossed the fill line. Flips back on
// scroll-up so the timeline reads as a real progress indicator.
function useReached(ref) {
  const [reached, setReached] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      setReached(el.getBoundingClientRect().top <= window.innerHeight * FILL_LINE);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return reached;
}

export default function Achievements() {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? items : items.filter((x) => x.cat === tab);

  // Spine fill: 0 when the timeline top hits the fill line, 1 when its end does.
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: [`start ${FILL_LINE * 100}%`, `end ${FILL_LINE * 100}%`],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="achievements" className="section-pad relative z-10">
      <SectionHeading
        index="07"
        eyebrow="Recognition"
        title="Milestones & achievements."
        subtitle="Competitions cleared, ranks earned, and things I'm proud to have shipped — filter to trace the journey."
      />

      {/* ── Animated stat strip ───────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <div className="glass grad-border group relative h-full overflow-hidden p-5">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
              />
              <s.Icon size={18} className="text-ink-muted" />
              <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-2 font-display text-4xl font-extrabold sm:text-5xl">
                <span className="gradient-text">
                  {s.prefix}
                  <CountUp value={s.value} />
                </span>
                {s.names && (
                  <span className="flex flex-wrap items-center gap-1.5 pb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em]">
                    {s.names.map((n) => (
                      <span
                        key={n}
                        className="rounded-full border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 text-ink-muted transition-colors group-hover:border-white/[0.18] group-hover:text-ink"
                      >
                        {n}
                      </span>
                    ))}
                    <span className="text-ink-faint">& many more…</span>
                  </span>
                )}
              </div>
              <p className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-muted">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Filter tabs ───────────────────────────────────── */}
      <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const isActive = tab === t;
          const count =
            t === "All" ? items.length : items.filter((x) => x.cat === t).length;
          const accent = t === "All" ? "#9333ea" : CATS[t].accent;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
              style={{ color: isActive ? "#f3f4f8" : "rgba(255,255,255,0.6)" }}
            >
              {isActive && (
                <motion.span
                  layoutId="recogTabPill"
                  className="absolute inset-0 rounded-full border"
                  style={{
                    background: `${accent}26`,
                    borderColor: `${accent}66`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                {t === "All" ? "All" : CATS[t].label}
                <span
                  className="rounded-full px-1.5 py-0.5 font-mono text-[11px]"
                  style={{
                    background: isActive ? `${accent}30` : "rgba(255,255,255,0.08)",
                    color: isActive ? "#f3f4f8" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Recognition timeline ──────────────────────────── */}
      <div ref={timelineRef} className="relative mt-10">
        {/* unfilled spine track */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[19px] w-px bg-white/[0.09] md:left-1/2 md:-translate-x-1/2"
        />
        {/* progress fill — grows top-down as the section scrolls past.
            Wrapped for the same reason as the dots: scaleY would overwrite
            the translate that aligns it to the track. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[19px] w-px md:left-1/2 md:-translate-x-1/2"
        >
          <motion.div
            className="h-full w-full origin-top"
            style={{
              scaleY: fill,
              background:
                "linear-gradient(180deg, rgba(168,85,247,0.9), rgba(91,124,250,0.85) 50%, rgba(109,124,255,0.85))",
              boxShadow: "0 0 12px rgba(168,85,247,0.55)",
            }}
          />
        </div>

        <motion.div layout className="space-y-6 md:space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <TimelineRow key={item.id} item={item} side={i % 2 === 0 ? "left" : "right"} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineRow({ item, side }) {
  const right = side === "right";
  const { accent, glow, label } = CATS[item.cat];
  // measured on the node itself, not the row — the node is vertically centred
  // on desktop, so the row's top would light it early
  const nodeRef = useRef(null);
  const reached = useReached(nodeRef);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative md:flex md:items-center md:gap-10 ${right ? "md:flex-row-reverse" : ""}`}
    >
      {/* node on the spine — dim until the fill reaches it */}
      {/* Outer span owns positioning; the inner motion span owns the scale.
          Keeping them separate matters — Framer writes `transform` on the
          element it animates, which would clobber the -translate-*-1/2 that
          centres the dot on the spine. */}
      <span
        ref={nodeRef}
        aria-hidden
        className="absolute left-[19px] top-7 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
      >
        <motion.span
          className="grid h-3.5 w-3.5 place-items-center rounded-full"
          animate={{
            background: reached ? accent : "#2b2b36",
            boxShadow: reached
              ? `0 0 0 4px rgba(${glow},0.16), 0 0 16px rgba(${glow},0.9)`
              : `0 0 0 4px rgba(${glow},0), 0 0 0px rgba(${glow},0)`,
            scale: reached ? 1 : 0.6,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.span
            className="h-1 w-1 rounded-full bg-white/90"
            animate={{ opacity: reached ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
        </motion.span>
      </span>

      {/* card half */}
      <div className="pl-11 md:w-1/2 md:pl-0">
        <motion.div
          whileHover={{ y: -4 }}
          className="glass grad-border group relative overflow-hidden rounded-2xl p-5"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
            style={{ background: accent }}
          />

          <div className="flex items-start gap-3.5">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border"
              style={{ background: `${accent}1c`, borderColor: `${accent}44`, color: accent }}
            >
              <item.Icon size={20} />
            </span>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  {label}
                </span>
                <span className="rounded-full bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-ink-muted md:hidden">
                  {item.yearLabel}
                </span>
              </div>

              <h4 className="mt-2 font-display font-semibold leading-snug text-ink">
                {highlightNumbers(item.title)}
              </h4>

              {item.org && <p className="mt-1 text-sm text-ink-muted">{item.org}</p>}
              {item.meta && <p className="mt-0.5 font-mono text-xs text-ink-muted">{item.meta}</p>}

              {item.detail && (
                <span
                  className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  <Trophy size={12} />
                  {item.detail}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* year half — big faint marker (desktop) */}
      <div className={`hidden md:flex md:w-1/2 ${right ? "md:justify-end md:pr-2" : "md:justify-start md:pl-2"}`}>
        <span
          className="select-none font-display text-6xl font-extrabold leading-none tracking-tight text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
        >
          {item.yearLabel}
        </span>
      </div>
    </motion.div>
  );
}
