import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
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
