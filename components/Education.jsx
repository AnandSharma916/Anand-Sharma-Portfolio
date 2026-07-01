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

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1}>
              <div className="soft-card soft-card-hover flex flex-col gap-5 p-6 sm:flex-row md:p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber/20 to-coral/20 text-amber">
                  <GraduationCap size={24} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-medium md:text-2xl">
                      {e.degree}
                    </h3>
                    <span className="font-mono text-sm text-cream/40">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-amber">{e.school}</p>
                  <p className="mt-3 leading-relaxed text-cream/55">{e.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="flex h-full flex-col gap-6">
            <Panel icon={Award} title="Certifications" items={certifications} />
            <Panel icon={Trophy} title="Achievements" items={achievements} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Panel({ icon: Icon, title, items }) {
  return (
    <div className="soft-card p-6">
      <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-medium">
        <Icon size={18} className="text-coral" /> {title}
      </h3>
      <ul className="space-y-4">
        {items.map((c) => (
          <li key={c} className="flex items-start gap-3 text-sm text-cream/65">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-amber to-coral" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
