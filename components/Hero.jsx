"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  MapPin,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { profile, stats } from "@/lib/data";
import anandPhoto from "@/public/Anand-Sharma.png";
import ScrambleText from "./ScrambleText";
import CountUp from "./CountUp";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const cell = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.21, 0.5, 0.27, 1] },
  },
};

const statAccents = ["#6366f1", "#8b5cf6", "#22d3ee", "#f43f5e"];

export default function Hero() {
  return (
    <section id="top" className="relative px-5 pt-28 sm:px-6 md:pt-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl grid-cols-2 gap-3.5 sm:gap-4 lg:auto-rows-[170px] lg:grid-flow-row-dense lg:grid-cols-4"
      >
        {/* Intro */}
        <motion.div
          variants={cell}
          className="bento card-glow col-span-2 flex flex-col justify-between lg:row-span-2"
          style={{ "--c": "#6366f1" }}
        >
          <div className="flex items-center justify-between">
            <span className="kicker">Portfolio — &apos;26</span>
            {profile.available && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
            )}
          </div>

          <div className="py-6">
            <div className="mb-3 flex items-center gap-2 font-mono text-sm text-indigo-300">
              <Sparkles size={14} /> Hi, I&apos;m
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">{profile.firstName}</span>{" "}
              <span className="gradient-text">{profile.name.split(" ")[1]}</span>
            </h1>
            <div className="mt-4 flex items-center gap-2 text-lg text-white/70 sm:text-xl">
              <span className="font-mono text-indigo-300">&gt;</span>
              <ScrambleText phrases={profile.roles} className="font-medium text-white/90" />
              <span className="inline-block h-5 w-[3px] animate-blink bg-cyan-400" />
            </div>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-white/55">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.7)] transition-transform hover:scale-[1.03]"
            >
              View my work
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          variants={cell}
          className="bento group relative col-span-2 !p-0 sm:col-span-1 lg:row-span-2"
        >
          <div className="relative h-full min-h-[240px] w-full overflow-hidden rounded-[1.6rem]">
            <Image
              src={anandPhoto}
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 25vw"
              placeholder="blur"
              className="object-cover object-[52%_20%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/85 via-base/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-display text-lg font-bold">{profile.name}</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 backdrop-blur-md transition-colors group-hover:bg-indigo-500">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          variants={cell}
          className="bento bento-hover card-glow flex flex-col justify-between"
          style={{ "--c": "#10b981" }}
        >
          <MapPin size={18} className="text-emerald-300" />
          <div>
            <div className="font-display text-lg font-bold leading-tight">
              {profile.location.split(",")[0]}
            </div>
            <div className="kicker mt-1">Based in India</div>
          </div>
        </motion.div>

        {/* Stat cards */}
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={cell}
            className="bento bento-hover card-glow flex flex-col justify-between"
            style={{ "--c": statAccents[i % statAccents.length] }}
          >
            <div
              className="font-display text-4xl font-extrabold tracking-tight"
              style={{ color: statAccents[i % statAccents.length] }}
            >
              <CountUp value={s.value} />
            </div>
            <div className="kicker">{s.label}</div>
          </motion.div>
        ))}

        {/* Socials */}
        <motion.div
          variants={cell}
          className="bento bento-hover card-glow flex flex-col justify-between"
          style={{ "--c": "#f59e0b" }}
        >
          <span className="kicker">Connect</span>
          <div className="flex gap-2">
            {[
              { Icon: Github, href: profile.socials[0]?.href || "#" },
              { Icon: Linkedin, href: profile.socials[1]?.href || "#" },
              { Icon: Mail, href: `mailto:${profile.email}` },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
