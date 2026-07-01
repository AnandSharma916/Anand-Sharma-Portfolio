import { GraduationCap, Award, Trophy } from "lucide-react";
import { education, certifications, achievements } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="section-pad">
      <SectionHeading
        index="05"
        eyebrow="Education"
        title="Foundations & continuous learning."
      />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1}>
              <div className="offset-hover flex flex-col gap-5 border-2 border-ink bg-bone-2 p-6 sm:flex-row md:p-8">
                <span className="grid h-14 w-14 shrink-0 place-items-center border-2 border-ink bg-lime text-ink">
                  <GraduationCap size={24} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                      {e.degree}
                    </h3>
                    <span className="font-mono text-sm text-ink/50">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-sm uppercase tracking-wider text-ink/70">
                    {e.school}
                  </p>
                  <p className="mt-3 text-ink/65">{e.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="flex h-full flex-col gap-8">
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
    <div className="border-2 border-ink p-6">
      <h3 className="mb-5 flex items-center gap-2 border-b-2 border-ink pb-3 font-display text-lg font-bold uppercase tracking-tight">
        <Icon size={18} /> {title}
      </h3>
      <ul className="space-y-3.5">
        {items.map((c) => (
          <li key={c} className="flex items-start gap-3 text-sm text-ink/75">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 border border-ink bg-lime" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
