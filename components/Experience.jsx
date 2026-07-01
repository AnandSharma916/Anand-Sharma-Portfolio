import { MapPin, Calendar } from "lucide-react";
import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const accents = ["#6366f1", "#8b5cf6", "#22d3ee", "#f43f5e"];

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative z-10">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I've made an impact."
        subtitle="Building responsive products, integrating APIs, and shipping what matters."
      />

      <div className="grid gap-4">
        {experience.map((job, i) => (
          <Reveal key={job.role + job.company} delay={i * 0.06}>
            <div
              className="bento bento-hover card-glow grid gap-5 md:grid-cols-12 md:items-center"
              style={{ "--c": accents[i % accents.length] }}
            >
              <div className="md:col-span-4">
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: accents[i % accents.length] }}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold leading-tight md:text-2xl">
                  {job.role}
                </h3>
                <p className="mt-1 text-white/60">{job.company}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-white/45">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} /> {job.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} /> {job.location}
                  </span>
                </div>
              </div>

              <div className="md:col-span-8">
                <p className="leading-relaxed text-white/65">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-white/60"
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
    </section>
  );
}
