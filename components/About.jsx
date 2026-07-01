import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { about, profile } from "@/lib/data";
import anandPhoto from "@/public/Anand-Sharma.png";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <SectionHeading index="01" eyebrow="About" title={about.heading} />

      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        {/* Photo — hard frame, lime offset, grayscale → color on hover */}
        <div className="md:col-span-5">
          <Parallax speed={-0.08}>
            <div className="relative w-full max-w-sm">
              <div className="hard offset-lime overflow-hidden bg-bone-2">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={anandPhoto}
                    alt={profile.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    placeholder="blur"
                    className="object-cover object-[52%_20%] grayscale transition-all duration-700 hover:grayscale-0"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-5 border-2 border-ink bg-lime px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-ink">
                {profile.name} / {profile.location.split(",")[0]}
              </div>
            </div>
          </Parallax>
        </div>

        {/* Copy + facts */}
        <div className="md:col-span-7">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-lg leading-relaxed text-ink/75 md:text-xl">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {/* highlights */}
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {about.highlights.map((h) => (
                <span
                  key={h}
                  className="border-2 border-ink px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:bg-lime"
                >
                  {h}
                </span>
              ))}
            </div>
          </Reveal>

          {/* fact list */}
          <Reveal delay={0.28}>
            <div className="mt-10 border-t-2 border-ink">
              <Fact label="Name" value={profile.name} />
              <Fact label="Based in" value={profile.location} />
              <Fact label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <Fact label="Status" value="Open to work" accent />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value, href, accent }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="flex items-center justify-between gap-4 border-b-2 border-ink/15 py-3.5"
    >
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
        {label}
      </span>
      <span
        className={`flex items-center gap-1.5 text-sm font-semibold md:text-base ${
          accent ? "text-lime-deep" : "text-ink"
        }`}
      >
        {value}
        {href && <ArrowUpRight size={15} className="text-ink/50" />}
      </span>
    </Wrapper>
  );
}
