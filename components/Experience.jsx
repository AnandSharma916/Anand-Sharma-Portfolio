"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "motion/react";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const accents = ["#a855f7", "#6d7cff", "#818cf8", "#5b7cfa"];

// Derive a compact date range from the periods, e.g. "2024 — Present".
const years = experience.flatMap((j) =>
  (j.period.match(/\d{4}/g) || []).map(Number)
);
const startYear = Math.min(...years);
const hasPresent = experience.some((j) => /present/i.test(j.period));
const range = `${startYear} — ${hasPresent ? "Present" : Math.max(...years)}`;

export default function Experience() {
  const [active, setActive] = useState(0);
  const total = String(experience.length).padStart(2, "0");

  return (
    <section id="experience" className="section-pad relative z-10">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I've made an impact."
        subtitle="A running log of the roles that shaped how I build — scroll through, or jump to any chapter."
      />

      <div className="md:grid md:grid-cols-[15rem_1fr] md:gap-10 lg:grid-cols-[18rem_1fr] lg:gap-14 3xl:grid-cols-[22rem_1fr] 3xl:gap-20">
        {/* ————— Sticky index rail (desktop) ————— */}
        <aside className="hidden md:block">
          <div className="sticky top-28 self-start">
            <p className="kicker">
              {experience.length} positions · {range}
            </p>

            {/* big morphing active index */}
            <div className="relative mt-3 flex h-24 items-center font-display font-extrabold leading-none">
              <div className="relative h-[4.5rem] w-24 overflow-hidden 3xl:h-[5.5rem] 3xl:w-28">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="gradient-text absolute inset-0 text-[4.5rem] leading-none 3xl:text-[5.5rem]"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[2.2rem] text-ink-faint">/ {total}</span>
            </div>

            {/* clickable company nav with sliding highlight */}
            <nav className="mt-5 space-y-1">
              {experience.map((job, i) => {
                const isActive = active === i;
                const accent = accents[i % accents.length];
                return (
                  <a
                    key={job.role + job.company}
                    href={`#exp-${i}`}
                    onClick={() => setActive(i)}
                    className="relative flex items-center gap-3 rounded-xl px-3 py-2.5"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="expNavPill"
                        className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.05]"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span
                      className="relative h-8 w-[3px] rounded-full transition-all duration-300"
                      style={{
                        background: isActive ? accent : "rgba(255,255,255,0.14)",
                        boxShadow: isActive ? `0 0 10px ${accent}` : "none",
                      }}
                    />
                    <span className="relative min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm font-semibold transition-colors ${
                          isActive ? "text-ink" : "text-ink-muted"
                        }`}
                      >
                        {job.role}
                      </span>
                      <span className="block truncate text-xs text-ink-muted">
                        {job.company}
                      </span>
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ————— Entry cards ————— */}
        <div className="space-y-5 xs:space-y-6 md:space-y-14">
          {experience.map((job, i) => (
            <Entry
              key={job.role + job.company}
              job={job}
              index={i}
              accent={accents[i % accents.length]}
              onActive={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Entry({ job, index, accent, onActive }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Scroll-spy: a thin band in the viewport middle marks the "active" entry.
  const spyInView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const revealInView = useInView(ref, { once: true, margin: "-90px" });
  const isCurrent = /present/i.test(job.period);

  useEffect(() => {
    if (spyInView) onActive(index);
  }, [spyInView, index, onActive]);

  return (
    <motion.article
      ref={ref}
      id={`exp-${index}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 34 }}
      animate={revealInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.21, 0.5, 0.27, 1] }}
      className="glass grad-border group relative scroll-mt-24 overflow-hidden p-5 xs:p-6 md:p-8 md:scroll-mt-28 3xl:p-10"
    >
      {/* accent side spine + soft glow */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 origin-top transition-transform duration-500 group-hover:scale-y-100"
        style={{ background: `linear-gradient(${accent}, transparent)` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: accent }}
      />

      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <span
          className="font-display text-3xl font-extrabold leading-none xs:text-4xl"
          style={{ color: accent, opacity: 0.85 }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2 xs:gap-3">
          {isCurrent && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider"
              style={{
                color: accent,
                borderColor: `${accent}66`,
                background: `${accent}14`,
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full"
                  style={{ background: accent, opacity: 0.7 }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: accent }}
                />
              </span>
              Current
            </span>
          )}

          {/* Company mark. The source PNG is an opaque white plate, so the
              circle is white too and `overflow-hidden` clips it round. */}
          {job.logo && (
            <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-white/[0.12] xs:h-12 xs:w-12">
              <Image
                src={job.logo}
                alt={`${job.company} logo`}
                width={48}
                height={48}
                className={job.logoClass || "h-full w-full object-contain p-1.5"}
              />
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-3 font-display text-lg font-extrabold leading-tight text-ink xs:text-xl md:text-2xl 3xl:text-3xl">
        {job.role}
      </h3>
      <p
        className="mt-1 inline-flex flex-wrap items-center gap-1 text-sm font-semibold"
        style={{ color: accent }}
      >
        {job.company}
        <ArrowUpRight
          size={14}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </p>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12px] text-ink-muted">
        <span className="flex items-center gap-1.5">
          <Calendar size={12} /> {job.period}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={12} /> {job.location}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-muted xs:text-[1rem]/[1.5rem] 3xl:text-lg">{job.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span
            key={t}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[12px] text-ink-muted transition-colors group-hover:border-white/[0.14] group-hover:text-ink"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
