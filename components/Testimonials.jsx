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
              <Quote className="absolute right-6 top-6 text-white/[0.06]" size={48} />
              <blockquote className="relative text-lg leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-flame-500 to-fern-500 font-bold text-white">
                  {t.name[0]}
                </span>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-ink-muted">{t.title}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
