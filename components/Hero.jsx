"use client";

import { motion } from "motion/react";
import ParallaxTilt from "react-parallax-tilt";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { profile, stats } from "@/lib/data";
import ScrambleText from "./ScrambleText";
import CountUp from "./CountUp";
import Annotate from "./Annotate";
import MagneticButton from "./MagneticButton";
import { burst } from "./ConfettiButton";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.5, 0.27, 1] },
  },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-28 xs:px-5 sm:px-6 md:pt-40 lg:px-8 3xl:px-12 3xl:pt-48">
      {/* local glow accent behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[min(46rem,150vw)] w-[min(46rem,150vw)] -translate-x-1/2 rounded-full opacity-40 blur-[80px] sm:blur-[110px]"
        style={{
          background:
            "conic-gradient(from 140deg, rgba(109,124,255,0.4), rgba(91,124,250,0.38), rgba(168,85,247,0.4), rgba(109,124,255,0.4))",
          maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-5xl text-center 2xl:max-w-6xl 3xl:max-w-[84rem]"
      >
        <motion.span
          variants={item}
          className="grad-border inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted backdrop-blur xs:px-4 xs:text-[12px] xs:tracking-[0.16em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_10px_#5b7cfa]" />
          </span>
          {profile.available ? "Open to work" : "Currently building"} — {profile.location.split(",")[0]}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-[clamp(2rem,8.6vw,7rem)] font-extrabold leading-[0.95] tracking-tight sm:mt-8 sm:leading-[0.92] 3xl:text-[clamp(7rem,5.5vw,8.75rem)]"
        >
          <span className="block text-ink">{profile.name}</span>
          <span className="gradient-text block">
            <Annotate type="underline" color="#a855f7" strokeWidth={3} delay={1000}>
              builds the web.
            </Annotate>
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[1rem]/[1.5rem] text-ink-muted xs:text-lg sm:text-xl"
        >
          <span className="font-mono text-blue-600">&lt;/&gt;</span>
          <ScrambleText phrases={profile.roles} className="font-medium text-ink" />
          <span className="inline-block h-5 w-[3px] animate-blink bg-pink-400" />
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-pretty text-[1rem]/[1.5rem] leading-relaxed text-ink-muted xs:text-lg 3xl:max-w-3xl 3xl:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4"
        >
          <a
            href="#projects"
            onClick={() => burst(0.5)}
            className="btn-gradient group text-[1rem]/[1.5rem]"
          >
            View projects
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex max-w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/[0.05] xs:px-6 xs:text-[1rem]/[1.5rem]"
          >
            Get in touch
          </a>
          <div className="flex gap-2">
            {[
              {
                Icon: Github,
                href: profile.socials[0]?.href || "#",
                label: profile.socials[0]?.handle || "GitHub",
              },
              {
                Icon: Linkedin,
                href: profile.socials[1]?.href || "#",
                label: profile.socials[1]?.handle || "LinkedIn",
              },
              { Icon: Mail, href: `mailto:${profile.email}`, label: profile.email },
            ].map(({ Icon, href, label }, i) => (
              <MagneticButton
                key={i}
                href={href}
                title={label}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                strength={0.5}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-muted transition-colors hover:border-blue-600/50 hover:text-ink"
              >
                <Icon size={18} />
              </MagneticButton>
            ))}
          </div>
        </motion.div>

        {/* Stat row — interactive 3D-tilt cards with a moving glare sheen */}
        <motion.div
          variants={item}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-2.5 xs:gap-3 sm:mt-16 sm:grid-cols-4 3xl:max-w-5xl 3xl:gap-5"
        >
          {stats.map((s) => (
            <ParallaxTilt
              key={s.label}
              glareEnable
              glareMaxOpacity={0.22}
              glareColor="#bfb8e7"
              glarePosition="all"
              glareBorderRadius="16px"
              tiltMaxAngleX={14}
              tiltMaxAngleY={14}
              scale={1.04}
              transitionSpeed={1200}
              className="glass grad-border overflow-hidden px-3 py-4 xs:px-4 xs:py-5 3xl:px-6 3xl:py-7"
            >
              <div className="gradient-text font-display text-2xl font-extrabold xs:text-3xl sm:text-4xl 3xl:text-5xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted xs:text-[11px] xs:tracking-[0.16em]">
                {s.label}
              </div>
            </ParallaxTilt>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
