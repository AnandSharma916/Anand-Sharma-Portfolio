import { Check, Sparkles } from "lucide-react";
import { about, profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section-pad relative z-10">
      <SectionHeading index="01" eyebrow="About" title={about.heading} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bio */}
        <Reveal className="lg:col-span-2">
          <div className="bento card-glow h-full" style={{ "--c": "#6366f1" }}>
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-white/70">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.08] pt-6">
              <Info label="Name" value={profile.name} />
              <Info label="Email" value={profile.email} />
              <Info label="Location" value={profile.location} />
            </div>
          </div>
        </Reveal>

        {/* Focus areas */}
        <Reveal delay={0.1}>
          <div className="bento card-glow h-full" style={{ "--c": "#22d3ee" }}>
            <div className="mb-5 flex items-center gap-2 font-display font-bold">
              <Sparkles size={16} className="text-cyan-300" /> What I do
            </div>
            <ul className="space-y-3">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-gradient-to-br from-indigo-500/30 to-cyan-400/30 text-cyan-300">
                    <Check size={12} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div className="min-w-[120px]">
      <div className="kicker">{label}</div>
      <div className="mt-1 text-sm font-medium text-white/85">{value}</div>
    </div>
  );
}
