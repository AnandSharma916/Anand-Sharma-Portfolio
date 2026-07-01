"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative z-10">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title="Selected work I'm proud of."
        subtitle="A mix of products, open-source, and experiments. Hover to peek."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1}>
            <Tilt className="h-full" max={6}>
              <a
                href="#"
                className="soft-card soft-card-hover group relative flex h-full flex-col overflow-hidden p-8"
              >
                {/* gradient corner glow */}
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-amber to-coral opacity-20 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-40" />

                <div className="relative z-10 flex items-center justify-between [transform:translateZ(35px)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber to-coral font-display text-lg font-semibold text-espresso shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {p.title[0]}
                  </span>
                  {p.featured && (
                    <span className="flex items-center gap-1 rounded-full border border-cream/10 bg-cream/[0.04] px-2.5 py-1 text-xs text-peach">
                      <Star size={11} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>

                <h3 className="relative z-10 mt-6 flex items-center gap-1.5 font-display text-2xl font-medium [transform:translateZ(25px)]">
                  {p.title}
                  <ArrowUpRight
                    size={19}
                    className="text-cream/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-coral"
                  />
                </h3>

                <p className="relative z-10 mt-3 flex-1 leading-relaxed text-cream/55 [transform:translateZ(15px)]">
                  {p.blurb}
                </p>

                <div className="relative z-10 mt-6 flex flex-wrap gap-2 [transform:translateZ(10px)]">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-cream/[0.05] px-3 py-1 font-mono text-xs text-cream/55 transition-colors group-hover:bg-cream/[0.09] group-hover:text-cream/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
