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
      else endTimer = setTimeout(() => setDone(true), 400);
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
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 text-bone sm:px-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-bone/50">
            <span>Portfolio</span>
            <span>©2026</span>
          </div>

          <div className="flex flex-1 items-center">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="font-display text-[16vw] font-extrabold leading-[0.85] tracking-tightest md:text-[11rem]"
              >
                {profile.firstName}
                <span className="text-lime">.</span>
              </motion.h1>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between font-mono text-xs uppercase tracking-[0.2em] text-bone/60">
              <span>Loading</span>
              <span className="font-display text-4xl font-bold tabular-nums text-bone">
                {count}%
              </span>
            </div>
            <div className="h-[3px] w-full bg-bone/15">
              <div
                className="h-full bg-lime"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
