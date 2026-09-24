"use client";

import { motion, useReducedMotion } from "motion/react";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  className = "",
}) {
  const reduce = useReducedMotion();

  // Respect prefers-reduced-motion: fade only, no travel.
  const from = reduce
    ? { opacity: 0 }
    : { opacity: 0, y, x, scale };
  const to = { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={to}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.5, 0.27, 1] }}
    >
      {children}
    </motion.div>
  );
}
