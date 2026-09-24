"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

// Splits "1.5+" -> { target: 1.5, suffix: "+", decimals: 1 }
function parse(value) {
  const match = String(value).match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, suffix: String(value), decimals: 0 };
  const decimals = (match[1].split(".")[1] || "").length;
  return { target: parseFloat(match[1]), suffix: match[2], decimals };
}

export default function CountUp({ value, duration = 1700 }) {
  const ref = useRef(null);
  // once: false — replays the count every time the section scrolls back into view
  const inView = useInView(ref, { margin: "-15% 0px" });
  const { target, suffix, decimals } = parse(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0); // reset so the next entry counts up from scratch
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(eased * target);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
