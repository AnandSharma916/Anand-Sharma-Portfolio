import { ArrowUpRight, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <Reveal y={40}>
        <div className="relative overflow-hidden border-2 border-ink bg-ink px-6 py-16 text-bone md:px-14 md:py-24">
          {/* corner lime marker */}
          <div className="absolute right-0 top-0 h-24 w-24 border-b-2 border-l-2 border-bone/20 bg-lime" />

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime">
            Let&apos;s build together
          </p>

          <TextReveal
            as="h2"
            text="Have an idea? Let's make it real."
            className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[0.95] tracking-tightest md:text-7xl"
          />

          <p className="mt-6 max-w-lg text-bone/60">
            I&apos;m currently available for freelance projects and full-time
            roles. Drop me a line and I&apos;ll get back within 24 hours.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-12 flex flex-wrap items-center gap-3 border-b-2 border-bone/20 pb-4 font-display text-2xl font-extrabold tracking-tight text-bone transition-colors hover:text-lime sm:text-3xl md:text-5xl"
          >
            <span className="break-all">{profile.email}</span>
            <ArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 font-mono text-sm text-bone/70 transition-colors hover:text-lime"
              >
                <Phone size={15} /> {profile.phone}
              </a>
            )}
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 font-mono text-sm uppercase tracking-wider text-bone/70 transition-colors hover:text-lime"
              >
                {s.label}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
