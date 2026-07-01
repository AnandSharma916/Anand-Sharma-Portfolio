import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function SectionHeading({ index, eyebrow, title, subtitle }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal y={0}>
        <div className="flex items-center justify-between border-t-2 border-ink pt-4">
          <span className="eyebrow">{eyebrow}</span>
          <span className="font-mono text-sm text-ink/45">({index})</span>
        </div>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        className="mt-7 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[0.92] tracking-tightest sm:text-6xl"
      />

      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/60">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
