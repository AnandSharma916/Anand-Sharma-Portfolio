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
  metadataBase: new URL("https://anand-sharma-portfolio.vercel.app"),
  title: {
    default: `${profile.name} — Full Stack Developer & MERN Specialist`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Anand Sharma is a Full Stack Developer & MERN specialist based in New Delhi, India. 1.5+ years experience building performant, responsive web apps with React.js, Next.js, and Node.js.",
  keywords: [
    "Anand Sharma",
    "Anand Sharma Portfolio",
    "Full Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Frontend Developer Delhi",
    "Web Developer India",
    "Node.js Developer",
    "JavaScript Developer",
    "Software Engineer",
    "UI/UX Designer",
    "Tailwind CSS Specialist",
  ],
  authors: [{ name: profile.name, url: "https://anand-sharma-portfolio.vercel.app" }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://anand-sharma-portfolio.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://anand-sharma-portfolio.vercel.app",
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} — Full Stack Developer & MERN Specialist`,
    description:
      "Full Stack Developer with 1.5+ years of experience building fast, responsive web applications with React.js, Next.js, and the MERN stack.",
    images: [
      {
        url: "/Anand-Sharma.webp",
        width: 1200,
        height: 630,
        alt: `${profile.name} — Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full Stack Developer & MERN Specialist`,
    description:
      "Full Stack Developer building performant, beautiful web experiences with React.js and the MERN stack.",
    creator: "@anandsharma916",
    images: ["/Anand-Sharma.webp"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://anand-sharma-portfolio.vercel.app/#person",
      name: profile.name,
      jobTitle: profile.roles[0],
      url: "https://anand-sharma-portfolio.vercel.app",
      image: "https://anand-sharma-portfolio.vercel.app/Anand-Sharma.webp",
      sameAs: [
        "https://github.com/anandsharma916",
        "https://www.linkedin.com/in/anandsharma916/",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Delhi",
        addressCountry: "India",
      },
      email: profile.email,
      knowsAbout: [
        "React.js",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "MERN Stack",
        "Web Development",
        "REST API",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://anand-sharma-portfolio.vercel.app/#website",
      url: "https://anand-sharma-portfolio.vercel.app",
      name: `${profile.name} Portfolio`,
      description: profile.tagline,
      publisher: {
        "@id": "https://anand-sharma-portfolio.vercel.app/#person",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-base font-sans text-ink">{children}</body>
    </html>
  );
}
