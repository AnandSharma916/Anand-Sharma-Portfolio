"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CornerDownLeft, Compass, Mail, Copy, ArrowUp } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

const goto = (hash) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo(
    () => [
      ...navLinks.map((l) => ({
        group: "Navigate",
        label: l.label,
        hint: l.href,
        icon: Compass,
        run: () => goto(l.href),
      })),
      {
        group: "Actions",
        label: "Send an email",
        hint: profile.email,
        icon: Mail,
        run: () => (window.location.href = `mailto:${profile.email}`),
      },
      {
        group: "Actions",
        label: "Copy email address",
        hint: "to clipboard",
        icon: Copy,
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        group: "Actions",
        label: "Back to top",
        hint: "#top",
        icon: ArrowUp,
        run: () => goto("#top"),
      },
    ],
    []
  );

  const filtered = useMemo(
    () => items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const select = (item) => {
    if (!item) return;
    setOpen(false);
    setTimeout(() => item.run(), 130);
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[active]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.21, 0.5, 0.27, 1] }}
            className="offset-ink relative z-10 w-full max-w-xl overflow-hidden border-2 border-ink bg-bone"
          >
            <div className="flex items-center gap-3 border-b-2 border-ink px-4">
              <Search size={18} className="text-ink/50" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Jump to a section or run a command…"
                className="w-full bg-transparent py-4 font-mono text-[14px] text-ink placeholder:text-ink/40 focus:outline-none"
              />
              <kbd className="hidden border border-ink/30 bg-bone-2 px-2 py-0.5 font-mono text-[10px] text-ink/60 sm:block">
                ESC
              </kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-sm text-ink/50">
                  No matches for “{query}”
                </li>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon;
                const isActive = i === active;
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => select(item)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                        isActive ? "bg-lime" : "hover:bg-bone-2"
                      }`}
                    >
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center border-2 border-ink ${
                          isActive ? "bg-ink text-lime" : "bg-bone text-ink"
                        }`}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-ink">{item.label}</span>
                        <span className="block font-mono text-xs text-ink/50">{item.hint}</span>
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">
                        {item.group}
                      </span>
                      {isActive && <CornerDownLeft size={14} className="text-ink" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
