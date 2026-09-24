"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  ArrowUpRight,
  Code2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FolderGit2,
  ExternalLink,
} from "lucide-react";
import { moreProjects } from "@/lib/data";

const accents = [
  { from: "#a855f7", to: "#5b7cfa", solid: "#c084fc", glow: "rgba(168,85,247,0.25)" },
  { from: "#5b7cfa", to: "#6d7cff", solid: "#7c93ff", glow: "rgba(91,124,250,0.25)" },
  { from: "#6d7cff", to: "#a855f7", solid: "#a78bfa", glow: "rgba(109,124,255,0.25)" },
  { from: "#7e22ce", to: "#4f5bd5", solid: "#c084fc", glow: "rgba(126,34,206,0.25)" },
  { from: "#4f5bd5", to: "#c084fc", solid: "#9aa8ff", glow: "rgba(79,91,213,0.25)" },
];

/**
 * Archive Projects Gallery — Seamless horizontal scroll (right to left).
 * - Full-bleed / minimal edge padding (no large empty gaps on left or right)
 * - Crystal clear Full-HD image rendering without dark obscuring overlays
 * - Dual interaction: smooth vertical-scroll driven right-to-left translation + 
 *   interactive Prev / Next arrows for instant sliding
 */
export default function MoreProjects() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const [scrollRange, setScrollRange] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate dynamic travel distance with zero unnecessary edge gaps
  const updateScrollRange = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    // Calculate exact scroll range so the last item aligns flush with right margin
    const maxScroll = Math.max(0, totalWidth - viewportWidth);
    setScrollRange(maxScroll);
  }, []);

  useEffect(() => {
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);

    const observer = new ResizeObserver(updateScrollRange);
    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    const timer = setTimeout(updateScrollRange, 350);

    return () => {
      window.removeEventListener("resize", updateScrollRange);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [updateScrollRange]);

  // Smooth spring physics for fluid right-to-left scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);
  const progressPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Track active project index based on scroll position
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const totalItems = moreProjects.length + 1; // including github card
      const idx = Math.min(
        totalItems - 1,
        Math.max(0, Math.round(latest * (totalItems - 1)))
      );
      setCurrentIndex(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Arrow button navigation: smoothly scroll window to target project
  const scrollToItem = (direction) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalScrollableHeight = rect.height - window.innerHeight;
    if (totalScrollableHeight <= 0) return;

    const totalItems = moreProjects.length;
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    nextIndex = Math.max(0, Math.min(totalItems, nextIndex));

    const targetFraction = nextIndex / totalItems;
    const targetY = scrollTop + rect.top + targetFraction * totalScrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Fallback for reduced motion
  if (reduce) {
    return (
      <section id="more-projects" className="w-full px-4 sm:px-8 md:px-12 py-16 relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="gradient-text font-display text-sm font-bold tracking-widest">
              05
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-pink-500/70 to-transparent" />
            <span className="kicker">Archive</span>
          </div>
          <h2 className="mt-2 font-display text-2xl xs:text-3xl md:text-4xl font-extrabold text-ink">
            Some more major projects
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Other things I&apos;ve designed, built, and shipped along the way.
          </p>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory">
          {moreProjects.map((p, i) => (
            <div key={p.title} className="snap-start shrink-0">
              <Card p={p} index={i} accent={accents[i % accents.length]} />
            </div>
          ))}
          <GitHubCard />
        </div>
      </section>
    );
  }

  return (
    <section
      id="more-projects"
      ref={containerRef}
      className="relative z-10 h-[300vh] w-full"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden py-5 sm:py-7">
        {/* Ambient backlight glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-iris-500/20 via-flame-500/10 to-transparent blur-3xl"
        />

        {/* ————— Section Header (Flush, no large side voids) ————— */}
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="gradient-text font-display text-sm font-bold tracking-widest">
                  05
                </span>
                <span className="h-px w-8 bg-gradient-to-r from-pink-500/70 to-transparent" />
                <span className="kicker">Archive</span>
              </div>
              <h2 className="mt-1.5 font-display text-2xl xs:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-ink">
                Some more major projects
              </h2>
              <p className="mt-1 text-xs xs:text-sm md:text-base text-ink-muted">
                Other things I&apos;ve designed, built, and shipped along the way.
              </p>
            </div>

            {/* Navigation controls & project counter badge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden xs:flex items-center gap-2 rounded-full border border-white/10 bg-panel-2/80 px-3 py-1.5 shadow-sm backdrop-blur-md text-xs font-mono text-ink-muted">
                <span className="inline-block h-2 w-2 rounded-full bg-iris-400 animate-pulse" />
                <span className="text-[11px] uppercase tracking-wider text-ink-soft">
                  Right to Left Scroll
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[11px] text-ink font-semibold">
                  {moreProjects.length} Projects
                </span>
              </div>

              {/* Prev / Next Clickable Arrow Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToItem("prev")}
                  aria-label="Previous project"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink hover:bg-white/15 hover:text-white transition-all active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToItem("next")}
                  aria-label="Next project"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink hover:bg-white/15 hover:text-white transition-all active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ————— Horizontal Track (Translates Right to Left on Scroll) ————— */}
        <div className="relative w-full overflow-hidden my-auto py-3">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max items-stretch gap-5 sm:gap-6 md:gap-7 pl-4 sm:pl-8 md:pl-12 lg:pl-16 pr-4 sm:pr-8 md:pr-12 lg:pr-16"
          >
            {moreProjects.map((p, i) => (
              <Card
                key={p.title}
                p={p}
                index={i}
                accent={accents[i % accents.length]}
              />
            ))}

            <GitHubCard />
          </motion.div>
        </div>

        {/* ————— Progress Bar & Interactive Footer ————— */}
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 shrink-0">
          <div className="flex items-center justify-between gap-4 text-xs font-mono text-ink-faint">
            <div className="flex items-center gap-3">
              <span className="text-ink font-semibold">
                {String(Math.min(currentIndex + 1, moreProjects.length)).padStart(2, "0")}
              </span>
              <div className="h-1.5 w-32 sm:w-60 md:w-80 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-iris-400 via-flame-400 to-iris-300 rounded-full"
                  style={{ width: progressPercent }}
                />
              </div>
              <span className="text-ink font-semibold">
                {String(moreProjects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2 text-ink-muted text-[11px] sm:text-xs">
              <span className="hidden sm:inline">Vertical Scroll</span>
              <span className="text-iris-400 font-bold">↓</span>
              <span className="text-white/20">•</span>
              <span>Horizontal Motion</span>
              <span className="text-flame-400 font-bold">←</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ p, index, accent }) {
  return (
    <article
      className="group relative flex flex-col justify-between w-[86vw] max-w-[340px] xs:max-w-[410px] sm:w-[480px] md:w-[520px] lg:w-[550px] shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#0c0d16]/95 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:shadow-[0_25px_60px_-15px_rgba(168,85,247,0.3)]"
      style={{ borderTopColor: `${accent.solid}aa` }}
    >
      {/* Top accent glow line */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] z-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.solid}, transparent)`,
        }}
      />

      {/* ————— Full HD Crystal-Clear Screenshot Container ————— */}
      <div className="relative aspect-[16/8.8] w-full overflow-hidden bg-[#06070c] border-b border-white/[0.08]">
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.title} HD screenshot`}
            fill
            unoptimized
            priority={index < 2}
            quality={95}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 520px, 550px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="h-full w-full flex items-center justify-center font-mono text-sm text-ink-muted"
            style={{ background: `linear-gradient(135deg, ${accent.from}33, ${accent.to}33)` }}
          >
            {p.title}
          </div>
        )}

        {/* Clean top badges: Index and Year */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3 py-1 text-xs backdrop-blur-md shadow-sm">
          <span
            className="font-mono text-xs font-bold tracking-wider"
            style={{ color: accent.solid }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-white/30">•</span>
          <span className="font-mono text-xs text-white/80 font-medium">
            {p.year}
          </span>
        </div>

        {/* Live indicator pill on top right */}
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${p.title} live demo`}
            className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-2.5 py-1 text-[11px] font-mono font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-white hover:text-black"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live</span>
            <ExternalLink size={11} className="ml-0.5" />
          </a>
        )}
      </div>

      {/* ————— Card Content & Details ————— */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-5 sm:p-6">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-ink group-hover:text-white transition-colors line-clamp-1">
            {p.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted line-clamp-3">
            {p.blurb}
          </p>
        </div>

        <div className="space-y-3.5 pt-2">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em]"
                style={{
                  color: accent.solid,
                  borderColor: `${accent.solid}44`,
                  background: `${accent.solid}14`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-5 border-t border-white/[0.08] pt-3">
            <a
              href={p.demo || "#"}
              {...(p.demo ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-white"
            >
              <span>Live Demo</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {p.source && (
              <a
                href={p.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
              >
                <span>Source</span>
                <Code2 size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function GitHubCard() {
  return (
    <div className="flex flex-col justify-between w-[280px] sm:w-[320px] shrink-0 rounded-2xl sm:rounded-3xl border border-dashed border-white/25 bg-[#0c0d16]/80 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-[#0c0d16]/95">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-iris-400">
          <FolderGit2 size={22} />
        </div>
        <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-ink-muted">
          <Sparkles size={11} className="text-iris-400" /> 40+ Repos
        </span>
      </div>

      <div className="my-auto py-4">
        <h4 className="font-display text-xl font-bold text-ink">
          More on GitHub
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
          Explore complete open-source repositories, components, and client projects on my profile.
        </p>
      </div>

      <a
        href="https://github.com/anandsharma916"
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs font-medium text-ink transition-all hover:bg-white/10 hover:text-white"
      >
        <span>anandsharma916</span>
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </div>
  );
}
