import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { about, profile } from "@/lib/data";
import anandPhoto from "@/public/Anand-Sharma.webp";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Annotate from "./Annotate";

export default function About() {
  return (
    <section id="about" className="section-pad relative z-10">
      <SectionHeading index="01" eyebrow="About" title={about.heading} />

      <div className="grid items-start gap-5 lg:grid-cols-3 3xl:gap-8">
        {/* Bio */}
        <Reveal className="lg:sticky lg:top-24 lg:col-span-2 lg:self-start">
          <div className="glass grad-border flex flex-col p-5 xs:p-7 md:p-9">
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-[1rem]/[1.5rem] leading-relaxed text-ink-muted xs:text-lg">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 border-t border-white/[0.08] pt-6">
              <Info label="Name" value={profile.name} />
              <Info label="Email" value={profile.email} />
              <Info label="Location" value={profile.location} />
            </div>
          </div>
        </Reveal>

        {/* Portrait + focus */}
        <Reveal delay={0.1} className="flex flex-col gap-5">
          <div className="glass grad-border shrink-0 overflow-hidden !p-0">
            {/* The portrait is a full-body shot (9:16). Desktop shows it
                whole; the narrower mobile frame crops from the bottom so the
                face is never the part that gets cut. */}
            <div className="relative aspect-[3/4] w-full lg:aspect-[9/16]">
              <Image
                src={anandPhoto}
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1920px) 33vw, 600px"
                placeholder="blur"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />
            </div>
          </div>

          <div className="glass p-5 xs:p-6">
            <div className="mb-5 flex items-center gap-2 font-display font-bold">
              <Sparkles size={16} className="text-blue-600" />
              <Annotate type="circle" color="#5b7cfa" padding={6} delay={300}>
                What I do
              </Annotate>
            </div>
            <ul className="space-y-3">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm text-ink-muted">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-pink-600 text-white shadow-[0_4px_10px_-3px_rgba(91,124,250,0.6)]">
                    <Check size={12} strokeWidth={3} />
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
    <div className="min-w-0 max-w-full basis-[calc(50%-0.75rem)] xs:basis-auto xs:min-w-[120px]">
      <div className="kicker">{label}</div>
      <div className="mt-1 break-words text-sm font-medium text-ink">{value}</div>
    </div>
  );
}
