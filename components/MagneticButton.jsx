"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A link/button that gently pulls toward the cursor while hovered, then
 * springs back on leave. Renders an <a> by default.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}
