"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Brutalist ring cursor: a hollow ink ring that trails the pointer and
 * snaps larger + fills lime when hovering links/buttons. Fine pointers only.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target;
      setHovering(
        !!el.closest?.("a, button, [data-cursor], input, textarea")
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{
          width: hovering ? 56 : 26,
          height: hovering ? 56 : 26,
          backgroundColor: hovering ? "rgba(204,255,0,0.9)" : "rgba(204,255,0,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink"
      />
    </motion.div>
  );
}
