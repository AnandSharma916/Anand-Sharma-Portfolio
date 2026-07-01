import { MapPin, ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I've made an impact."
        subtitle="Building responsive products, integrating APIs, and shipping what matters."
      />

      <div className="border-t-2 border-ink">
        {experience.map((job, i) => (
          <Reveal key={job.role + job.company} delay={i * 0.05}>
            <article className="group border-b-2 border-ink px-2 py-8 transition-colors duration-300 hover:bg-lime md:px-4">
              <div className="grid gap-4 md:grid-cols-12 md:items-start">
                <div className="font-mono text-lg font-bold text-ink/50 md:col-span-1">
                  0{i + 1}
                </div>

                <div className="md:col-span-6">
                  <h3 className="flex items-start gap-2 font-display text-2xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
                    {job.role}
                    <ArrowUpRight
                      className="mt-1 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      size={22}
                    />
                  </h3>
                  <p className="mt-2 font-mono text-sm uppercase tracking-[0.15em] text-ink/70">
                    {job.company}
                  </p>
                </div>

                <div className="md:col-span-5 md:text-right">
                  <div className="font-mono text-sm font-semibold text-ink">
                    {job.period}
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-ink/60 md:justify-end">
                    <MapPin size={13} /> {job.location}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-12">
                <div className="hidden md:col-span-1 md:block" />
                <p className="text-ink/75 md:col-span-7">{job.description}</p>
                <div className="flex flex-wrap content-start gap-2 md:col-span-4 md:justify-end">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="border-2 border-ink bg-bone px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-ink transition-colors group-hover:bg-lime"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
