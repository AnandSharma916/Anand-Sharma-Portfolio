"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

// Fired by the navbar (and anything else that wants to open the form).
export const HIRE_ME_EVENT = "open-hire-me";
export const openHireMe = () => window.dispatchEvent(new Event(HIRE_ME_EVENT));

export default function HireMeModal() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0); // bumps to reset the form

  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // Open on the custom event; remember what to hand focus back to.
  useEffect(() => {
    const onOpen = () => {
      returnFocusRef.current = document.activeElement;
      setSession((s) => s + 1);
      setOpen(true);
    };
    window.addEventListener(HIRE_ME_EVENT, onOpen);
    return () => window.removeEventListener(HIRE_ME_EVENT, onOpen);
  }, []);

  // Lock page scroll while the dialog is up.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    returnFocusRef.current?.focus?.();
  }, [open]);

  // Escape to close + keep Tab inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll(
        'input, textarea, button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center px-3 py-6 xs:px-4 xs:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-base/75 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hire-me-title"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.21, 0.5, 0.27, 1] }}
            className="glass grad-border relative z-10 max-h-full w-full max-w-lg overflow-y-auto !bg-panel/95 p-5 shadow-2xl backdrop-blur-xl xs:p-7"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 opacity-60 blur-[90px]"
              style={{
                background:
                  "conic-gradient(from 90deg, rgba(109,124,255,0.6), rgba(91,124,250,0.5), rgba(168,85,247,0.5), rgba(109,124,255,0.6))",
              }}
            />

            {/* z-20: the form below is a later positioned sibling and would
                otherwise paint over this button. */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-xl text-ink-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              <X size={18} />
            </button>

            <ContactForm
              idPrefix="hire"
              titleId="hire-me-title"
              autoFocus
              resetKey={session}
              onDone={close}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
