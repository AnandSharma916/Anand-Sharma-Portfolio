import "./globals.css";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const sans = Space_Grotesk({
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
      <body className="font-sans">{children}</body>
    </html>
  );
}
