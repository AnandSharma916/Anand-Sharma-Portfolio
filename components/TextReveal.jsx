"use client";

import { motion } from "framer-motion";

/**
 * Editorial word-by-word mask reveal: each word sits in an overflow-hidden
 * clip and slides up from below, staggered, when scrolled into view.
 *
 * as    — heading tag ("h1", "h2", "p"...)
 * text  — the string to animate
 */
export default function TextReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.05,
  y = "110%",
}) {
  const Tag = motion[as] || motion.h2;
  const words = String(text).split(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="mr-[0.26em] inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y },
              show: {
                y: 0,
                transition: { duration: 0.7, ease: [0.21, 0.5, 0.27, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
