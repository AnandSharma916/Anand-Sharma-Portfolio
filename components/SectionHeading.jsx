import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function SectionHeading({ index, eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 md:mb-16 3xl:mb-20">
      <Reveal y={12}>
        <div className="flex items-center gap-3">
          <span className="gradient-text font-display text-sm font-bold tracking-widest">
            {index}
          </span>
          <span className="h-px w-8 bg-gradient-to-r from-pink-500/70 to-transparent" />
          <span className="kicker">{eyebrow}</span>
        </div>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        className="mt-4 max-w-3xl font-display text-[clamp(1.5rem,5.6vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-ink sm:leading-[1.02] 3xl:max-w-5xl 3xl:text-[3.5rem]"
      />

      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted xs:text-[1rem]/[1.5rem] 3xl:max-w-3xl 3xl:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
