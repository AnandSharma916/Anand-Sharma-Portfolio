"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative z-10">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="A toolkit honed across the full stack."
        subtitle="Technologies I reach for to design, build, and ship products that scale."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.1}>
            <div className="soft-card soft-card-hover h-full p-7">
              <h3 className="mb-6 flex items-center gap-2.5 font-display text-xl font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-amber to-coral shadow-[0_0_10px_rgba(255,94,126,0.7)]" />
                {group.category}
              </h3>
              <div className="space-y-5">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-cream/75">{skill.name}</span>
                      <span className="font-mono text-cream/40">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-cream/[0.07]">
                      <motion.div
                        className="relative h-full rounded-full bg-gradient-to-r from-amber via-coral to-peach"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.2 + si * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <span className="shimmer absolute inset-0 animate-shimmer" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
