import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cream/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-cream/40 sm:flex-row">
        <p className="font-display italic">
          © {new Date().getFullYear()} {profile.name}. Crafted with care.
        </p>
        <p className="font-mono">
          Designed &amp; built in {profile.location.split(",")[0]}
        </p>
      </div>
    </footer>
  );
}
