"use client";

import { techStack } from "@/lib/data";

function Row({ reverse, size = "text-4xl md:text-5xl", star = "text-lime" }) {
  const items = [...techStack, ...techStack];
  return (
    <div
      className={`flex w-max items-center whitespace-nowrap ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`px-6 font-display font-extrabold uppercase tracking-tight ${size}`}
          >
            {t}
          </span>
          <span className={`text-2xl ${star}`}>✳</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-ink text-bone">
      <div className="py-5">
        <Row />
      </div>
      <div className="border-t-2 border-bone/20 bg-lime py-3 text-ink">
        <Row reverse size="text-xl md:text-2xl" star="text-ink" />
      </div>
    </div>
  );
}
