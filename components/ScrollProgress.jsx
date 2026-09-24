"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-fern-500 via-flame-500 to-iris-500 shadow-[0_0_12px_rgba(91,124,250,0.7)]"
    />
  );
}
