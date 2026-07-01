"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked parallax wrapper. Continuously translates its children
 * as the element travels through the viewport (unlike a one-shot reveal).
 *
 * speed  — how far it drifts, in % of its own height (negative = opposite way)
 * axis   — "y" (default) or "x"
 */
export default function Parallax({
  children,
  speed = 0.2,
  axis = "y",
  className = "",
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = reduce ? ["0%", "0%"] : [`${speed * 100}%`, `${-speed * 100}%`];
  const shift = useTransform(scrollYProgress, [0, 1], range);

  return (
    <div ref={ref} className={className}>
      <motion.div style={axis === "x" ? { x: shift } : { y: shift }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
