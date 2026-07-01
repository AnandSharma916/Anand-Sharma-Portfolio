import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-ink px-5 sm:px-8">
      <div className="mx-auto max-w-[88rem]">
        <a
          href="#top"
          className="group flex items-center justify-between gap-4 border-b-2 border-ink py-10 md:py-14"
        >
          <span className="font-display text-4xl font-extrabold uppercase leading-none tracking-tightest transition-colors group-hover:text-lime-deep md:text-8xl">
            Back to top
          </span>
          <span className="grid h-14 w-14 shrink-0 place-items-center border-2 border-ink transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-lime md:h-20 md:w-20">
            <ArrowUp className="md:h-8 md:w-8" />
          </span>
        </a>

        <div className="flex flex-col justify-between gap-3 py-8 font-mono text-xs uppercase tracking-[0.15em] text-ink/60 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {profile.name} — All rights reserved
          </span>
          <span>Built with Next.js in {profile.location.split(",")[0]}</span>
        </div>
      </div>
    </footer>
  );
}
