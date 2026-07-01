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
          <span className="px-5 font-display text-xl font-semibold text-white/40 transition-colors duration-300 hover:text-white md:text-2xl">
            {t}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="section-pad !py-6">
      <div className="relative space-y-3 overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-panel py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-panel to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-panel to-transparent" />
        <Row />
        <Row reverse />
      </div>
    </div>
  );
}
