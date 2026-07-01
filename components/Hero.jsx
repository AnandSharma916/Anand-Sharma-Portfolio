"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, stats } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import ScrambleText from "./ScrambleText";
import CountUp from "./CountUp";

const EASE = [0.21, 0.5, 0.27, 1];
const line = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: 0.35 + i * 0.12 },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const op = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen overflow-hidden px-5 pt-28 sm:px-8 md:pt-32"
    >
      <motion.div
        style={{ y, opacity: op }}
        className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-[88rem] flex-col justify-center"
      >
        {/* eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink pb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink/60"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-deep opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-deep" />
            </span>
            Available for work — Anand Sharma
          </span>
          <span>{profile.location}</span>
        </motion.div>

        {/* headline */}
        <h1 className="mt-8 font-display font-extrabold uppercase leading-[0.82] tracking-tightest">
          <span className="block overflow-hidden">
            <motion.span
              variants={line}
              custom={0}
              initial="hidden"
              animate="show"
              className="block text-[14vw] md:text-[11rem]"
            >
              Full–Stack
            </motion.span>
          </span>
          <span className="mt-1 block overflow-hidden pb-[0.08em]">
            <motion.span
              variants={line}
              custom={1}
              initial="hidden"
              animate="show"
              className="block text-[14vw] md:text-[11rem]"
            >
              <span className="box-decoration-clone bg-lime px-3 text-ink">
                Developer
              </span>
            </motion.span>
          </span>
        </h1>

        {/* role + tagline + CTAs */}
        <div className="mt-9 flex flex-col gap-8 border-b-2 border-ink pb-9 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-lg text-ink md:text-xl">
              <span className="text-lime-deep">&gt;</span>
              <ScrambleText phrases={profile.roles} className="font-semibold" />
              <span className="inline-block h-5 w-[10px] animate-blink bg-ink" />
            </div>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink/70 md:text-lg">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#projects"
              className="group inline-flex items-center gap-2 border-2 border-ink bg-lime px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-y-1"
            >
              View work
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="group inline-flex items-center gap-2 border-2 border-ink bg-bone px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>

        {/* stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x-2 md:divide-ink">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-b-2 border-ink py-6 md:border-b-0 md:px-6 md:first:pl-0"
            >
              <div className="font-display text-4xl font-extrabold md:text-5xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* rotating scroll stamp */}
      <div className="pointer-events-none absolute bottom-8 right-6 hidden h-28 w-28 lg:block">
        <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slower">
          <defs>
            <path
              id="stampPath"
              d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="fill-ink font-mono text-[8.5px] uppercase tracking-[0.22em]">
            <textPath href="#stampPath">
              Scroll to explore • Scroll to explore •
            </textPath>
          </text>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lime">
            <ArrowDown size={18} />
          </span>
        </div>
      </div>
    </section>
  );
}
