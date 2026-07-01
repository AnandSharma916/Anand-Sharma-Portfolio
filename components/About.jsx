import Image from "next/image";
import { Check } from "lucide-react";
import { about, profile } from "@/lib/data";
import anandPhoto from "@/public/Anand-Sharma.png";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import Tilt from "./Tilt";

export default function About() {
  return (
    <section id="about" className="section-pad relative z-10">
      <SectionHeading index="01" eyebrow="About" title={about.heading} />

      <div className="grid gap-12 md:grid-cols-5">
        <div className="space-y-5 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-cream/70 md:text-xl">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {about.highlights.map((h) => (
                <span
                  key={h}
                  className="gradient-pill flex items-center gap-1.5 px-3.5 py-1.5 text-sm text-cream/75"
                >
                  <Check size={13} className="text-amber" />
                  {h}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-2">
          <Parallax speed={-0.1}>
            <Tilt className="relative" max={8}>
              {/* warm gradient ring + glow */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber via-coral to-peach opacity-30 blur-2xl animate-glow-pulse [transform:translateZ(0)]" />
              <div className="relative rounded-[1.8rem] bg-gradient-to-br from-amber via-coral to-peach p-[2px] [transform:translateZ(30px)]">
                <div className="overflow-hidden rounded-[1.7rem] bg-espresso-2">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={anandPhoto}
                      alt={profile.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 40vw"
                      placeholder="blur"
                      className="object-cover object-[52%_20%] transition-transform duration-700 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
                    {/* name tag */}
                    <div className="absolute bottom-4 left-4 rounded-full border border-cream/15 bg-espresso/70 px-4 py-1.5 font-mono text-xs text-cream/80 backdrop-blur-md">
                      {profile.name} · {profile.location.split(",")[0]}
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
