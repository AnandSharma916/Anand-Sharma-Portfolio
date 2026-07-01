"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkles, MapPin } from "lucide-react";
import { profile, stats } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import ScrambleText from "./ScrambleText";
import CountUp from "./CountUp";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.21, 0.5, 0.27, 1] },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.95]);
  const orbA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 170]);
  const orbB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 240]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center justify-center px-6 pt-28"
    >
      {/* floating warm orbs */}
      <motion.div
        aria-hidden
        style={{ y: orbA }}
        className="pointer-events-none absolute left-[9%] top-[24%]"
      >
        <motion.div
          animate={{ y: [0, -26, 0], x: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="h-24 w-24 rounded-full bg-gradient-to-br from-amber to-coral opacity-30 blur-2xl"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orbB }}
        className="pointer-events-none absolute right-[11%] top-[30%]"
      >
        <motion.div
          animate={{ y: [0, 24, 0], x: [0, -16, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="h-32 w-32 rounded-full bg-gradient-to-br from-coral to-peach opacity-25 blur-2xl"
        />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        {profile.available && (
          <motion.div variants={item} className="mb-8 flex justify-center">
            <span className="gradient-pill inline-flex items-center gap-2 px-4 py-1.5 text-sm text-cream/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              Available for new projects
            </span>
          </motion.div>
        )}

        <motion.div
          variants={item}
          className="mb-5 flex items-center justify-center gap-2 font-mono text-sm text-amber"
        >
          <Sparkles size={14} />
          <span>Hi, I&apos;m</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-cream">{profile.firstName}</span>{" "}
          <span className="gradient-text text-glow italic">
            {profile.name.split(" ")[1]}
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-7 flex h-10 items-center justify-center gap-2 text-2xl text-cream/85 sm:text-3xl"
        >
          <span className="font-mono text-amber">&gt;</span>
          <ScrambleText
            phrases={profile.roles}
            className="font-display italic text-cream"
          />
          <span className="ml-0.5 inline-block h-7 w-[3px] animate-blink bg-coral" />
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-cream/55"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber to-coral px-7 py-3.5 font-semibold text-espresso shadow-[0_10px_40px_-10px_rgba(255,94,126,0.6)]"
          >
            <span className="relative z-10">View my work</span>
            <ArrowDown size={17} className="relative z-10 transition-transform group-hover:translate-y-0.5" />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="rounded-full border border-cream/15 bg-cream/[0.03] px-7 py-3.5 font-semibold text-cream backdrop-blur-sm transition-colors hover:border-cream/30 hover:bg-cream/[0.07]"
          >
            Get in touch
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-cream/40"
        >
          <MapPin size={14} /> {profile.location}
        </motion.div>

        <motion.div
          variants={item}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="soft-card px-3 py-5"
            >
              <div className="gradient-text font-display text-3xl font-semibold">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-cream/45">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="block"
        >
          <ArrowDown size={22} />
        </motion.span>
      </motion.a>
    </section>
  );
}
