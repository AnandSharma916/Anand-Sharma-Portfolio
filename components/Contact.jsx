import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative z-10">
      <Reveal y={32}>
        <div
          className="bento card-glow relative overflow-hidden px-6 py-14 text-center md:py-20"
          style={{ "--c": "#6366f1" }}
        >
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/25 blur-[100px]" />

          <p className="kicker relative">Let&apos;s build together</p>

          <TextReveal
            as="h2"
            text="Have an idea? Let's make it real."
            className="relative mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
          />

          <p className="relative mx-auto mt-5 max-w-lg leading-relaxed text-white/55">
            I&apos;m currently available for freelance projects and full-time
            roles. Drop me a line and I&apos;ll get back within 24 hours.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3.5 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.7)] transition-transform hover:scale-[1.03]"
            >
              <Mail size={18} />
              {profile.email}
            </a>
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                <Phone size={18} />
                {profile.phone}
              </a>
            )}
          </div>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
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
