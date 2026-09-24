import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import ConfettiButton from "./ConfettiButton";
import Annotate from "./Annotate";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative z-10">
      <Reveal y={32}>
        <div className="relative py-8 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-80 w-full max-w-[40rem] -translate-x-1/2 opacity-70 blur-[70px] sm:blur-[100px]"
            style={{
              background:
                "conic-gradient(from 90deg, rgba(109,124,255,0.6), rgba(91,124,250,0.5), rgba(168,85,247,0.5), rgba(109,124,255,0.6))",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24 3xl:gap-32">
            {/* ————— pitch + direct contact details ————— */}
            <div className="text-left">
              <p className="kicker">Let&apos;s build together</p>

              <TextReveal
                as="h2"
                text="Got an idea? Let's make it real."
                className="mt-4 max-w-xl font-display text-[clamp(1.5rem,5.6vw,3rem)] font-extrabold leading-[1.1] tracking-tight sm:leading-[1.03] 3xl:text-[3.5rem]"
              />

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-muted xs:text-[1rem]/[1.5rem] 3xl:text-lg">
                I&apos;m currently available for freelance projects and full-time
                roles. Drop me a line and I&apos;ll get back{" "}
                <Annotate type="highlight" color="rgba(168,85,247,0.35)">
                  <span className="text-ink">within 24 hours</span>
                </Annotate>
                .
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ConfettiButton
                  href={`mailto:${profile.email}`}
                  className="btn-gradient w-full break-all text-sm xs:w-auto xs:text-[1rem]/[1.5rem]"
                >
                  <Mail size={18} />
                  {profile.email}
                </ConfettiButton>
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/[0.05] xs:w-auto xs:px-6 xs:text-[1rem]/[1.5rem]"
                  >
                    <Phone size={18} />
                    {profile.phone}
                  </a>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* ————— same enquiry form as the Hire Me modal ————— */}
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-4 backdrop-blur-md xs:p-6 md:p-7 3xl:p-9">
              <ContactForm idPrefix="contact" heading="Send a message" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
