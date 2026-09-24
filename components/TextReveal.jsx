"use client";

import { motion } from "motion/react";

/**
 * Character-by-character wave reveal: each letter rises out of an
 * overflow-hidden clip with a small rotation, staggered left-to-right so the
 * line reads as a travelling wave. Words stay grouped so wrapping still works.
 *
 * as    — heading tag ("h1", "h2", "p"...)
 * text  — the string to animate
 */
export default function TextReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.03,
  y = "110%",
}) {
  const Tag = motion[as] || motion.h2;
  const words = String(text).split(" ");

  // running index across the whole line so the wave doesn't restart per word
  let charIndex = -1;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
    >
      {words.map((word, w) => (
        <span
          key={w}
          aria-hidden
          className="mr-[0.26em] inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
        >
          {word.split("").map((char, c) => {
            charIndex += 1;
            return (
              <motion.span
                key={c}
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y, rotate: 6, opacity: 0 },
                  show: {
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.65,
                      delay: delay + charIndex * stagger,
                      ease: [0.21, 0.5, 0.27, 1],
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
