"use client";

import { techStack } from "@/lib/data";
import {
  SiReact, SiJavascript, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiMysql, SiRedux, SiGreensock, SiBootstrap, SiJquery, SiJsonwebtokens,
  SiGit, SiGithub, SiVercel, SiNetlify, SiDocker, SiFigma,
} from "react-icons/si";
import { Sparkles, Network } from "lucide-react";

// techStack label -> icon + its official brand color
const ICONS = {
  "React.js": [SiReact, "#61DAFB"],
  JavaScript: [SiJavascript, "#F7DF1E"],
  "Tailwind CSS": [SiTailwindcss, "#38BDF8"],
  "Node.js": [SiNodedotjs, "#5FA04E"],
  "Express.js": [SiExpress, "#E5E7EB"],
  MongoDB: [SiMongodb, "#47A248"],
  MySQL: [SiMysql, "#4479A1"],
  "Redux Toolkit": [SiRedux, "#764ABC"],
  GSAP: [SiGreensock, "#88CE02"],
  AOS: [Sparkles, "#C084FC"],
  Bootstrap: [SiBootstrap, "#7952B3"],
  jQuery: [SiJquery, "#0769AD"],
  "REST APIs": [Network, "#60A5FA"],
  JWT: [SiJsonwebtokens, "#D63AFF"],
  Git: [SiGit, "#F05032"],
  GitHub: [SiGithub, "#E5E7EB"],
  Vercel: [SiVercel, "#E5E7EB"],
  Netlify: [SiNetlify, "#00C7B7"],
  Docker: [SiDocker, "#2496ED"],
  Figma: [SiFigma, "#F24E1E"],
};

function Row({ reverse }) {
  const items = [...techStack, ...techStack];
  return (
    <div
      className={`flex w-max items-center whitespace-nowrap ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {items.map((t, i) => {
        const [Icon, color] = ICONS[t] || [];
        return (
          <span key={i} className="flex items-center">
            <span className="flex items-center gap-2 px-3 font-display text-[1rem]/[1.5rem] font-semibold text-ink xs:gap-2.5 xs:px-4 sm:px-5 sm:text-xl md:text-2xl 3xl:text-3xl">
              {Icon && (
                <Icon aria-hidden className="h-[18px] w-[18px] shrink-0 sm:h-[22px] sm:w-[22px]" style={{ color }} />
              )}
              {t}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-pink-500 to-blue-600" />
          </span>
        );
      })}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="section-pad !py-8">
      <div className="glass relative space-y-3 overflow-hidden py-4 sm:py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-base to-transparent xs:w-16 sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-base to-transparent xs:w-16 sm:w-28" />
        <Row />
        <Row reverse />
      </div>
    </div>
  );
}
