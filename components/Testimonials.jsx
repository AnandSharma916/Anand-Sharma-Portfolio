import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="section-pad relative z-10 !py-16">
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="spotlight gradient-border glass glass-hover relative h-full rounded-3xl p-8">
              <Quote className="absolute right-6 top-6 text-white/10" size={48} />
              <blockquote className="relative text-lg leading-relaxed text-white/75">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-accent to-cyan-glow font-bold text-white">
                  {t.name[0]}
                </span>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/45">{t.title}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
