"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="A toolkit honed across the full stack."
        subtitle="Technologies I reach for to design, build, and ship products that scale."
      />

      <div className="grid border-2 border-ink md:grid-cols-3">
        {skills.map((group, gi) => (
          <div
            key={group.category}
            className="border-ink p-7 [&:not(:last-child)]:border-b-2 md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r-2"
          >
            <div className="mb-8 flex items-baseline justify-between border-b-2 border-ink pb-3">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                {group.category}
              </h3>
              <span className="font-mono text-xs text-ink/45">
                0{gi + 1}
              </span>
            </div>

            <div className="space-y-6">
              {group.items.map((skill, si) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-mono text-sm font-medium text-ink">
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs text-ink/45">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-4 border-2 border-ink bg-bone">
                    <motion.div
                      className="h-full bg-lime"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.15 + si * 0.08,
                        ease: [0.21, 0.5, 0.27, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
