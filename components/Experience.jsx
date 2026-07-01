import { MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative z-10">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I've made an impact."
        subtitle="Building responsive products, integrating APIs, and shipping what matters."
      />

      <div className="relative">
        <div className="absolute left-0 top-2 bottom-2 hidden w-px bg-gradient-to-b from-amber via-coral/40 to-transparent md:left-[9px] md:block" />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <Reveal key={job.role + job.company} delay={i * 0.08}>
              <div className="group relative md:pl-16">
                <span className="absolute left-0 top-3 hidden h-5 w-5 items-center justify-center rounded-full border border-cream/15 bg-espresso md:flex">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-amber to-coral transition-transform group-hover:scale-150" />
                </span>

                <div className="soft-card soft-card-hover p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-xl font-medium md:text-2xl">
                        {job.role}
                      </h3>
                      <p className="mt-0.5 text-amber">{job.company}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-mono text-cream/60">{job.period}</div>
                      <div className="mt-1 flex items-center justify-end gap-1 text-cream/40">
                        <MapPin size={12} /> {job.location}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 leading-relaxed text-cream/60">
                    {job.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-cream/10 bg-cream/[0.03] px-3 py-1 text-xs text-cream/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
