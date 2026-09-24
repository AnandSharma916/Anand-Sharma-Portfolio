"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________abcdefghijklmnopqrstuvwxyz0123456789";
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * Cycles through `phrases`, decoding each one character-by-character with a
 * glitchy scramble in between — like a terminal resolving text.
 */
export default function ScrambleText({ phrases, className = "", hold = 2200 }) {
  const [html, setHtml] = useState(phrases[0]);
  const state = useRef({ text: phrases[0], queue: [], frame: 0, raf: 0, resolve: null });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      let i = 0;
      const id = setInterval(() => {
        i = (i + 1) % phrases.length;
        setHtml(phrases[i]);
      }, hold + 600);
      return () => clearInterval(id);
    }

    const s = state.current;
    let cancelled = false;

    const update = () => {
      let out = "";
      let complete = 0;
      for (let i = 0; i < s.queue.length; i++) {
        const item = s.queue[i];
        if (s.frame >= item.end) {
          complete++;
          out += item.to;
        } else if (s.frame >= item.start) {
          if (!item.char || Math.random() < 0.28) item.char = rand();
          out += `<span class="text-blue-400">${item.char}</span>`;
        } else {
          out += item.from;
        }
      }
      setHtml(out);
      if (complete === s.queue.length) {
        s.resolve && s.resolve();
      } else {
        s.frame++;
        s.raf = requestAnimationFrame(update);
      }
    };

    const setText = (next) =>
      new Promise((resolve) => {
        const old = s.text;
        s.text = next;
        const len = Math.max(old.length, next.length);
        s.queue = [];
        for (let i = 0; i < len; i++) {
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          s.queue.push({ from: old[i] || "", to: next[i] || "", start, end, char: "" });
        }
        cancelAnimationFrame(s.raf);
        s.frame = 0;
        s.resolve = resolve;
        update();
      });

    let i = 0;
    const loop = async () => {
      while (!cancelled) {
        i = (i + 1) % phrases.length;
        await setText(phrases[i]);
        await new Promise((r) => setTimeout(r, hold));
      }
    };
    const startId = setTimeout(loop, hold);

    return () => {
      cancelled = true;
      clearTimeout(startId);
      cancelAnimationFrame(s.raf);
    };
  }, [phrases, hold]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
