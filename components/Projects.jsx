import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <SectionHeading
        index="04"
        eyebrow="Projects"
        title="Selected work I'm proud of."
        subtitle="A mix of products, open-source, and experiments. Hover to peek."
      />

      <div className="grid gap-10 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1}>
            <a
              href="#"
              className="offset-hover group flex h-full flex-col border-2 border-ink bg-bone-2 p-7 md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-ink/50">
                  P.0{i + 1}
                </span>
                {p.featured && (
                  <span className="border-2 border-ink bg-lime px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                    ★ Featured
                  </span>
                )}
              </div>

              <h3 className="mt-10 font-display text-3xl font-extrabold leading-[0.98] tracking-tight md:text-[2.5rem]">
                {p.title}
              </h3>

              <p className="mt-5 flex-1 leading-relaxed text-ink/70">
                {p.blurb}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border-2 border-ink px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-ink transition-colors group-hover:bg-lime"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex items-center justify-between border-t-2 border-ink pt-4">
                <span className="font-mono text-sm font-bold uppercase tracking-[0.15em]">
                  View case
                </span>
                <span className="grid h-9 w-9 place-items-center border-2 border-ink transition-colors group-hover:bg-ink group-hover:text-lime">
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
