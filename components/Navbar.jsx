"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "border border-cream/10 bg-espresso-2/70 backdrop-blur-xl shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)]"
            : "border border-transparent"
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-amber to-coral font-sans text-sm font-bold text-espresso">
            {profile.firstName[0]}
          </span>
          <span className="hidden italic sm:block">{profile.firstName}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-cream/60 transition-colors hover:bg-cream/5 hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden items-center gap-2 rounded-full border border-cream/10 bg-cream/[0.03] px-3 py-2 text-sm text-cream/50 transition-colors hover:border-cream/20 hover:text-cream/80 md:flex"
            aria-label="Open command palette"
          >
            <Command size={13} />
            <kbd className="font-mono text-[10px] text-cream/45">K</kbd>
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-amber to-coral px-5 py-2 text-sm font-semibold text-espresso transition-transform hover:scale-[1.04] md:block"
          >
            Let&apos;s talk
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full text-cream/80 hover:bg-cream/5 md:hidden"
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
            className="absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-3xl border border-cream/10 bg-espresso-2/90 p-3 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-cream/70 hover:bg-cream/5 hover:text-cream"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
