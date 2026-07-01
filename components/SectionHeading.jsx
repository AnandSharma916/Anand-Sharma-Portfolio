import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function SectionHeading({ index, eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal y={12}>
        <div className="flex items-center gap-3">
          <span className="grid h-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 px-2 font-mono text-xs font-bold text-white">
            {index}
          </span>
          <span className="kicker">{eyebrow}</span>
        </div>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl"
      />

      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/55">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
