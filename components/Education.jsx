"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { GraduationCap, BadgeCheck, Sparkles, RotateCw, Undo2, Layers3 } from "lucide-react";
import { SiReact, SiJavascript } from "react-icons/si";
import { education, certifications } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";

const accents = ["#a855f7", "#5b7cfa"];

// Brand mark + colour per certification, matched off the credential name.
// Order matters: "full stack" is checked before the framework patterns.
const CERT_VISUALS = [
  { match: /full[\s-]?stack/i, Icon: Layers3, color: "#a855f7" },
  { match: /react/i, Icon: SiReact, color: "#61DAFB" },
  { match: /javascript|frontend/i, Icon: SiJavascript, color: "#F7DF1E" },
];

function certVisual(name) {
  return (
    CERT_VISUALS.find((v) => v.match.test(name)) || {
      Icon: BadgeCheck,
      color: "#5b7cfa",
    }
  );
}

// Pull a headline metric ("8.2 CGPA" / "Grade: A") out of the free-text detail.
function getMetric(detail) {
  const cg = detail.match(/([\d.]+)\s*CGPA/i);
  if (cg) return { value: cg[1], label: "CGPA" };
  const gr = detail.match(/Grade:\s*([A-Za-z][+-]?)/);
  if (gr) return { value: gr[1], label: "Grade" };
  return null;
}

export default function Education() {
  return (
    <section id="education" className="section-pad relative z-10">
      <SectionHeading
        index="06"
        eyebrow="Education"
        title="Foundations & continuous learning."
        subtitle="Hover over a card to see the coursework — degrees, credentials, and the skills each one forged."
      />

      {/* ── Degrees: 3D flip cards ───────────────────────── */}
      <div className="grid gap-5 xs:gap-6 md:grid-cols-2 md:gap-x-0 3xl:gap-y-8">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.1}>
            <FlipCard e={e} index={i} accent={accents[i % accents.length]} />
          </Reveal>
        ))}
      </div>

      {/* ── Certifications: credential cards ─────────────── */}
      <Reveal delay={0.1}>
        <div className="mt-12 flex items-center gap-2 font-display text-lg font-bold">
          <Sparkles size={18} className="text-pink-600" /> Certifications
        </div>
      </Reveal>

      <div className="mt-5 grid gap-4 xs:gap-5 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-7">
        {certifications.map((c, i) => {
          const { Icon, color } = certVisual(c);
          return (
            <Reveal key={c} delay={i * 0.08}>
              <SpotlightCard
                glow={`${color}33`}
                className="glass grad-border relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 xs:p-6 3xl:p-8"
              >
                {/* oversized brand watermark */}
                <Icon
                  aria-hidden
                  size={150}
                  className="pointer-events-none absolute -bottom-8 -right-6 opacity-[0.07] transition-transform duration-700 ease-out group-hover/spot:scale-110"
                  style={{ color }}
                />

                <div className="relative flex items-center justify-between">
                  {/* rotating dashed seal around the brand mark */}
                  <span className="relative grid h-12 w-12 place-items-center">
                    <span
                      className="absolute inset-0 rounded-full border border-dashed transition-transform duration-700 ease-out group-hover/spot:rotate-[135deg]"
                      style={{ borderColor: `${color}80` }}
                    />
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full border"
                      style={{
                        background: `${color}1f`,
                        borderColor: `${color}4d`,
                        color,
                      }}
                    >
                      <Icon size={18} />
                    </span>
                  </span>
                  <span className="font-display text-3xl font-extrabold text-white/[0.10]">
                    0{i + 1}
                  </span>
                </div>

                <p className="relative mt-5 font-display font-semibold leading-snug text-ink">
                  {c}
                </p>
                <p
                  className="relative mt-3 flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-widest"
                  style={{ color }}
                >
                  <BadgeCheck size={13} />
                  Verified credential
                </p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function FlipCard({ e, index, accent }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const metric = getMetric(e.detail);

  // `overflow-hidden` keeps the corner glow inside the rounded face (without it
  // the blob spills past the card and widens the page at md/lg).
  const faceBase =
    "absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-panel/80 p-5 xs:p-6 sm:p-7 [backface-visibility:hidden]";

  return (
    <div
      className="group h-[27rem] xs:h-[25rem] sm:h-[24rem] 3xl:h-[26rem] [perspective:1600px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        tabIndex={0}
        aria-label={`${e.degree} — coursework`}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full cursor-pointer rounded-3xl outline-none [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {/* gradient hairline via ::before on both faces' wrapper */}

        {/* ───── FRONT ───── */}
        <div className={faceBase}>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
            style={{ background: accent }}
          />
          <div className="flex items-start justify-between">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-white/[0.12] xs:h-14 xs:w-14"
              style={{ background: `${accent}1f`, color: accent }}
            >
              {e.logo ? (
                <Image
                  src={e.logo}
                  alt={e.school}
                  width={56}
                  height={56}
                  className={e.logoClass || "h-full w-full object-contain p-1"}
                />
              ) : (
                <GraduationCap className="h-7 w-7" />
              )}
            </span>
            <span className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-ink-muted xs:px-3 xs:text-xs">
              {e.period}
            </span>
          </div>

          <h3 className="mt-5 font-display text-lg font-extrabold leading-tight text-ink xs:text-xl md:text-2xl">
            {e.degree}
          </h3>
          <p className="mt-1.5 text-sm font-semibold" style={{ color: accent }}>
            {e.school}
          </p>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
            {metric ? (
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display text-4xl font-extrabold leading-none xs:text-5xl"
                  style={{ color: accent }}
                >
                  {metric.value}
                </span>
                <span className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">
                  {metric.label}
                </span>
              </div>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[12px] text-ink-muted transition-colors group-hover:text-ink">
              <RotateCw size={12} /> Coursework
            </span>
          </div>
        </div>

        {/* ───── BACK ───── */}
        <div className={`${faceBase} [transform:rotateY(180deg)]`}>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
            style={{ background: accent }}
          />
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span
              className="font-mono text-[11px] uppercase tracking-widest xs:text-[12px]"
              style={{ color: accent }}
            >
              Coursework & Skills
            </span>
            <span className="hidden items-center gap-1.5 font-mono text-[12px] text-ink-muted xs:inline-flex">
              <Undo2 size={12} /> Coursework
            </span>
          </div>

          {/* The detail copy plus ten skill chips overrun the fixed card
              height on a narrow column, so this pane scrolls on its own. */}
          <div className="no-scrollbar -mr-2 mt-3 min-h-0 flex-1 overflow-y-auto pr-2">
            <p className="text-sm leading-relaxed text-ink-muted">{e.detail}</p>

            {e.skills && (
              <div className="mt-4 flex flex-wrap content-start gap-1.5 xs:gap-2">
                {e.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[12px] text-ink-muted transition-colors hover:border-white/[0.18] hover:text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
