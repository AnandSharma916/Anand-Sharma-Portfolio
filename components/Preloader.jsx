"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/lib/data";

const EASE = [0.76, 0, 0.24, 1];

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(100);
      const t = setTimeout(() => setDone(true), 250);
      return () => clearTimeout(t);
    }

    let raf;
    let endTimer;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else endTimer = setTimeout(() => setDone(true), 420);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(endTimer);
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base px-5 text-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="max-w-full overflow-hidden">
            <motion.h1
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="gradient-text font-display text-[clamp(1.75rem,9vw,4.5rem)] font-extrabold tracking-tight"
            >
              {profile.name}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft xs:text-sm xs:tracking-[0.3em]"
          >
            {profile.roles[0]}
          </motion.p>

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-6xl items-end justify-between px-4 pb-4 font-mono text-[11px] text-ink-muted xs:px-6 xs:text-xs">
              <span>LOADING</span>
              <span className="text-xl tabular-nums text-ink xs:text-2xl">{count}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/[0.06]">
              <div
                className="h-full bg-gradient-to-r from-pink-400 via-pink-500 to-blue-600"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
