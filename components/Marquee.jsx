"use client";

import { techStack } from "@/lib/data";

function Row({ reverse }) {
  const items = [...techStack, ...techStack];
  return (
    <div
      className={`flex w-max items-center whitespace-nowrap ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-7 font-display text-3xl font-medium italic text-cream/70 transition-colors duration-300 hover:text-cream md:text-4xl">
            {t}
          </span>
          <span className="text-xl text-coral/70">✳</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative space-y-3 overflow-hidden border-y border-cream/10 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-espresso to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-espresso to-transparent" />
      <Row />
      <Row reverse />
    </div>
  );
}
