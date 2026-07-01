import { ArrowUpRight, Star } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const accents = ["#8b5cf6", "#22d3ee", "#f43f5e", "#6366f1"];

export default function Projects() {
  return (
    <section id="projects" className="section-pad relative z-10">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title="Selected work I'm proud of."
        subtitle="A mix of products, open-source, and experiments. Hover to peek."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => {
          const c = accents[i % accents.length];
          return (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <a
                href="#"
                className="bento bento-hover card-glow group flex h-full flex-col"
                style={{ "--c": c }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl font-display text-lg font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${c}, #22d3ee)` }}
                  >
                    {p.title[0]}
                  </span>
                  {p.featured && (
                    <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-amber-300">
                      <Star size={11} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>

                <h3 className="mt-5 flex items-center gap-1.5 font-display text-xl font-bold">
                  {p.title}
                  <ArrowUpRight
                    size={18}
                    className="text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  />
                </h3>

                <p className="mt-2 flex-1 leading-relaxed text-white/55">{p.blurb}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-white/55 transition-colors group-hover:bg-white/[0.09] group-hover:text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
