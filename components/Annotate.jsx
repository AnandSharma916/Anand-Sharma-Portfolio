"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { RoughNotation } from "react-rough-notation";

/**
 * Hand-drawn RoughNotation annotation (underline / circle / highlight / box …)
 * that draws itself the first time the wrapped text scrolls into view. Falls
 * back to plain text when the user prefers reduced motion.
 */
export default function Annotate({
  children,
  type = "underline",
  color = "#a855f7",
  strokeWidth = 2,
  multiline = true,
  delay = 200,
  padding = 2,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  if (reduce) {
    return <span ref={ref}>{children}</span>;
  }

  return (
    <RoughNotation
      type={type}
      show={inView}
      color={color}
      strokeWidth={strokeWidth}
      multiline={multiline}
      padding={padding}
      animationDuration={900}
      animationDelay={delay}
    >
      <span ref={ref}>{children}</span>
    </RoughNotation>
  );
}
