"use client";

import { useRef } from "react";

/**
 * Card with a radial glow that follows the cursor. Purely CSS-var driven so it
 * stays cheap. Wrap any content; pass extra classes for sizing/borders.
 */
export default function SpotlightCard({
  children,
  className = "",
  glow = "rgba(168,85,247,0.22)",
  size = 260,
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative overflow-hidden transition-all duration-300 will-change-transform hover:-translate-y-1.5 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 65%)`,
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
