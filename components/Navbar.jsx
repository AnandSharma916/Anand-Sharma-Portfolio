"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Download } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { openHireMe } from "./HireMeModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // scroll-spy: the section whose top has most recently passed the marker line
      const marker = window.innerHeight * 0.35;
      let current = "";
      for (const l of navLinks) {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top <= marker) current = l.href;
      }
      // near the very bottom, always light up the last link
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        current = navLinks[navLinks.length - 1].href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-[60] flex justify-center px-3 pt-3 xs:px-4 xs:pt-4"
    >
      <nav
        className={`relative flex w-full max-w-5xl items-center justify-between gap-2 rounded-2xl px-3 py-2.5 transition-all duration-300 xs:px-4 2xl:max-w-6xl 3xl:max-w-[84rem] ${
          scrolled
            ? "border border-white/[0.10] bg-panel/80 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)]"
            : "border border-white/[0.06] bg-panel/60 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.5)]"
        } backdrop-blur-xl`}
      >
        {/* subtle gradient ring glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-pink-400/15 via-pink-600/10 to-blue-500/15 opacity-70 blur-md"
        />

        <a href="#top" className="group flex shrink-0 items-center gap-2.5 font-display text-[1rem]/[1.5rem] font-bold text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-flame-600 to-flame-500 text-white shadow-[0_6px_18px_-6px_rgba(91,124,250,0.9)] transition-transform group-hover:scale-105">
            {profile.firstName[0]}
          </span>
          <span className="hidden sm:block">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-0.5 rounded-2xl border border-white/5 bg-white/[0.03] p-1 lg:flex">
          {navLinks.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-medium transition-colors xl:px-3.5 ${
                  isActive ? "text-white" : "text-ink hover:bg-white/[0.06] hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-fern-500 via-flame-600 to-flame-500 shadow-[0_6px_18px_-8px_rgba(91,124,250,0.9)]"
                  />
                )}
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download="Anand-Sharma-Resume.pdf"
            className="hidden items-center gap-1.5 rounded-xl border border-iris-500/30 bg-iris-500/15 px-3.5 py-2 text-sm font-semibold text-iris-800 shadow-[0_6px_18px_-10px_rgba(168,85,247,0.8)] transition-all duration-300 hover:scale-[1.04] hover:border-iris-500/60 hover:bg-iris-500/30 hover:text-white hover:shadow-[0_10px_26px_-8px_rgba(168,85,247,0.75)] lg:flex"
          >
            <Download size={14} />
            Download CV
          </a>
          <button
            type="button"
            onClick={openHireMe}
            className="group relative hidden overflow-hidden rounded-xl bg-gradient-to-r from-fern-500 via-flame-600 to-flame-500 bg-[length:200%_100%] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(91,124,250,0.9)] transition-all duration-300 hover:scale-[1.04] hover:bg-[position:100%_0] hover:shadow-[0_10px_30px_-6px_rgba(91,124,250,0.7)] lg:block"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Hire Me
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-ink hover:bg-white/[0.04] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-3 top-[4.25rem] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-white/[0.08] bg-panel/95 p-3 backdrop-blur-xl xs:inset-x-4 xs:top-[4.5rem] lg:hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href ? "page" : undefined}
                className={`block rounded-xl px-4 py-3 ${
                  active === l.href
                    ? "bg-white/[0.07] font-semibold text-white"
                    : "text-ink-muted hover:bg-white/[0.04] hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={profile.resume}
              download="Anand-Sharma-Resume.pdf"
              onClick={() => setOpen(false)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-iris-500/30 bg-iris-500/15 px-4 py-3 text-sm font-semibold text-iris-800 transition-colors hover:border-iris-500/60 hover:bg-iris-500/30 hover:text-white"
            >
              <Download size={15} />
              Download CV
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openHireMe();
              }}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-fern-500 via-flame-600 to-flame-500 px-4 py-3 text-sm font-semibold text-white"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
