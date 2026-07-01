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
    const duration = 1500;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else endTimer = setTimeout(() => setDone(true), 450);
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="gradient-text text-glow font-display text-5xl font-semibold italic tracking-tight md:text-7xl"
            >
              {profile.name}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-cream/40"
          >
            {profile.roles[0]}
          </motion.p>

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-6xl items-end justify-between px-6 pb-4 font-mono text-xs text-cream/40">
              <span>LOADING</span>
              <span className="text-2xl tabular-nums text-cream/80">{count}%</span>
            </div>
            <div className="h-[2px] w-full bg-cream/10">
              <div
                className="h-full bg-gradient-to-r from-amber via-coral to-peach"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
