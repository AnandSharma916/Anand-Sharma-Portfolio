"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

// Portfolio accent palette (blue / royal blue / pink).
const COLORS = ["#a855f7", "#6d7cff", "#818cf8", "#5b7cfa", "#7e22ce"];

export function burst(originX = 0.5) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const fire = (particleRatio, opts) =>
    confetti({
      origin: { x: originX, y: 0.72 },
      colors: COLORS,
      disableForReducedMotion: true,
      particleCount: Math.floor(180 * particleRatio),
      ...opts,
    });

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

/**
 * A link that showers palette-colored confetti from the click point, then
 * follows through to its href (so a mailto: still opens the mail client).
 */
export default function ConfettiButton({ href, className = "", children }) {
  const onClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    burst(originX);
  }, []);

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
