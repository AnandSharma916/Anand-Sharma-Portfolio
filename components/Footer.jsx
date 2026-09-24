import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] px-4 py-8 xs:px-5 sm:px-6 sm:py-10 lg:px-8 3xl:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-ink-muted xs:text-sm sm:flex-row sm:gap-4 sm:text-left 2xl:max-w-[82rem] 3xl:max-w-[96rem] 4xl:max-w-[112rem]">
        <p>
          © {new Date().getFullYear()} {profile.name}. Crafted with Next.js.
        </p>
        <p className="font-mono">
          Designed &amp; built in {profile.location.split(",")[0]}
        </p>
      </div>
    </footer>
  );
}
