import "./globals.css";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";

// Bricolage Grotesque — a characterful, optically-sized display grotesk.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: `${profile.name} — ${profile.roles[0]}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-base font-sans text-ink">{children}</body>
    </html>
  );
}
