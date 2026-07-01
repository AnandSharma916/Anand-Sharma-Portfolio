"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="gradient-text font-display text-5xl font-extrabold tracking-tight md:text-7xl"
            >
              {profile.name}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-white/35"
          >
            {profile.roles[0]}
          </motion.p>

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-6xl items-end justify-between px-6 pb-4 font-mono text-xs text-white/40">
              <span>LOADING</span>
              <span className="text-2xl tabular-nums text-white/80">{count}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
