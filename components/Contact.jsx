import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative z-10">
      <Reveal y={40}>
        <div className="soft-card relative overflow-hidden px-8 py-16 text-center md:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber/10 via-transparent to-coral/10" />
          <div className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-coral/25 blur-[100px]" />

          <p className="font-mono text-sm uppercase tracking-[0.25em] text-amber">
            Let&apos;s build together
          </p>

          <TextReveal
            as="h2"
            text="Have an idea? Let's make it real."
            className="mx-auto mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl"
          />

          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-cream/55">
            I&apos;m currently available for freelance projects and full-time
            roles. Drop me a line and I&apos;ll get back within 24 hours.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-coral px-7 py-3.5 font-semibold text-espresso shadow-[0_10px_40px_-10px_rgba(255,94,126,0.6)] transition-transform hover:scale-[1.04]"
            >
              <Mail size={18} />
              {profile.email}
            </a>
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="group inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.03] px-7 py-3.5 font-semibold text-cream transition-colors hover:border-cream/30 hover:bg-cream/[0.07]"
              >
                <Phone size={18} />
                {profile.phone}
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-cream/50 transition-colors hover:text-amber"
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
