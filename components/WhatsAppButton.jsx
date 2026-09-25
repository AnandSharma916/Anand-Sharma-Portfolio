"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { profile } from "@/lib/data";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const cleanPhone = (profile.phone || "+919479454314").replace(/[^\d]/g, "");
  const defaultMessage = encodeURIComponent(
    "Hi Anand, I came across your portfolio and would like to connect with you!"
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Contact on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6 select-none"
    >
      {/* Tooltip on Hover / Attention Badge */}
      <div
        className={`pointer-events-none hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-[#0c131d]/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur-md transition-all duration-300 sm:flex ${
          isHovered
            ? "translate-x-0 opacity-100"
            : "translate-x-2 opacity-0 group-hover:opacity-100"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>Chat on WhatsApp</span>
      </div>

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with Anand Sharma on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#128c7e] via-[#25d366] to-[#25d366] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_35px_rgba(37,211,102,0.7)] active:scale-95"
      >
        {/* Continuous Twinkling / Pulsing Radar Ring 1 */}
        <span
          className="absolute -inset-1 animate-ping rounded-full bg-[#25d366] opacity-35"
          style={{ animationDuration: "2.4s" }}
          aria-hidden="true"
        />

        {/* Continuous Pulsing Wave Ring 2 (Staggered) */}
        <span
          className="absolute -inset-2.5 animate-pulse rounded-full border-2 border-[#25d366]/40 opacity-70"
          style={{ animationDuration: "1.8s" }}
          aria-hidden="true"
        />

        {/* Continuous Twinkling Sparkle / Star (timtimate hue) */}
        <span
          className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center"
          aria-hidden="true"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" style={{ animationDuration: "1.2s" }} />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
        </span>

        {/* Inner Radial Glow */}
        <span
          className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <FaWhatsapp
          className="relative z-10 text-[32px] drop-shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
        />
      </a>
    </aside>
  );
}
