import { GraduationCap, Award, Trophy } from "lucide-react";
import { education, certifications, achievements } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="section-pad relative z-10">
      <SectionHeading
        index="05"
        eyebrow="Education"
        title="Foundations & continuous learning."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1}>
              <div className="bento bento-hover card-glow flex flex-col gap-5 sm:flex-row" style={{ "--c": "#6366f1" }}>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-cyan-400/25 text-indigo-300">
                  <GraduationCap size={24} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold">{e.degree}</h3>
                    <span className="font-mono text-sm text-white/40">{e.period}</span>
                  </div>
                  <p className="mt-0.5 text-indigo-300">{e.school}</p>
                  <p className="mt-3 leading-relaxed text-white/55">{e.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="flex h-full flex-col gap-4">
            <Panel icon={Award} title="Certifications" items={certifications} c="#22d3ee" />
            <Panel icon={Trophy} title="Achievements" items={achievements} c="#f59e0b" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Panel({ icon: Icon, title, items, c }) {
  return (
    <div className="bento card-glow" style={{ "--c": c }}>
      <h3 className="mb-5 flex items-center gap-2 font-display font-bold">
        <Icon size={18} style={{ color: c }} /> {title}
      </h3>
      <ul className="space-y-3.5">
        {items.map((x) => (
          <li key={x} className="flex items-start gap-3 text-sm text-white/65">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: c }}
            />
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}
