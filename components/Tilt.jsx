"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Wraps children in a card that tilts in 3D toward the cursor and exposes
 * --mx / --my for the `.spotlight` glow. Falls back gracefully on touch
 * (no pointer events fire, so it just sits flat).
 */
export default function Tilt({ children, className = "", max = 10, as = "div" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 18,
  });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px);
    my.set(py);
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`[transform-style:preserve-3d] ${className}`}
    >
      {children}
    </MotionTag>
  );
}
