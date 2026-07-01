"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-5 sm:pt-5"
    >
      <nav
        className={`mx-auto flex max-w-[88rem] items-center justify-between border-2 border-ink bg-bone px-4 py-2.5 transition-all duration-300 ${
          scrolled ? "offset-ink" : ""
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-lg font-extrabold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center bg-ink text-bone transition-colors group-hover:bg-lime group-hover:text-ink">
            {profile.firstName[0]}
          </span>
          <span className="hidden sm:block">
            {profile.firstName}
            <span className="text-lime-deep">°</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-center gap-1.5 px-3 py-2 font-mono text-xs uppercase tracking-widest text-ink/70 transition-colors hover:text-ink"
            >
              <span className="text-lime-deep opacity-0 transition-opacity group-hover:opacity-100">
                /
              </span>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden items-center gap-2 border-2 border-ink px-3 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-bone md:flex"
            aria-label="Open command palette"
          >
            <span>Menu</span>
            <kbd className="border border-ink/30 bg-bone-2 px-1.5 py-0.5 text-[10px]">
              ⌘K
            </kbd>
          </button>
          <a
            href="#contact"
            className="hidden border-2 border-ink bg-lime px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5 md:block"
          >
            Say hi
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center border-2 border-ink text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-[88rem] border-2 border-ink bg-bone p-2 md:hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-ink/10 px-4 py-3 font-mono text-sm uppercase tracking-widest text-ink/80 last:border-0 hover:bg-lime"
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
