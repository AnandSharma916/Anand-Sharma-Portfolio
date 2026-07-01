"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const accents = [
  { c: "#6366f1", bar: "from-indigo-500 to-violet-400" },
  { c: "#22d3ee", bar: "from-cyan-400 to-sky-400" },
  { c: "#f43f5e", bar: "from-rose-500 to-amber-400" },
];

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative z-10">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="A toolkit honed across the full stack."
        subtitle="Technologies I reach for to design, build, and ship products that scale."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {skills.map((group, gi) => {
          const a = accents[gi % accents.length];
          return (
            <Reveal key={group.category} delay={gi * 0.1}>
              <div className="bento bento-hover card-glow h-full" style={{ "--c": a.c }}>
                <h3 className="mb-6 flex items-center gap-2.5 font-display text-lg font-bold">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: a.c, boxShadow: `0 0 10px ${a.c}` }}
                  />
                  {group.category}
                </h3>
                <div className="space-y-5">
                  {group.items.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-white/75">{skill.name}</span>
                        <span className="font-mono text-white/40">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <motion.div
                          className={`relative h-full rounded-full bg-gradient-to-r ${a.bar}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.2 + si * 0.1, ease: "easeOut" }}
                        >
                          <span className="shimmer absolute inset-0 animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
