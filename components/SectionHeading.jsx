import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function SectionHeading({ index, eyebrow, title, subtitle }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal y={12}>
        <div className="flex items-center gap-3 font-mono text-sm">
          <span className="gradient-text font-semibold">{index}</span>
          <span className="h-px w-8 bg-gradient-to-r from-coral to-transparent" />
          <span className="uppercase tracking-[0.25em] text-cream/50">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream md:text-6xl"
      />

      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/55">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
