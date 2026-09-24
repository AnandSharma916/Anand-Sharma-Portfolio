"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { profile } from "@/lib/data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+(]?[\d][\d\s().-]{6,}$/;

const EMPTY = { email: "", phone: "", message: "" };

function validate(v) {
  const e = {};
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";

  if (!v.phone.trim()) e.phone = "Phone number is required.";
  else if (!PHONE_RE.test(v.phone.trim())) e.phone = "Enter a valid phone number.";

  if (!v.message.trim()) e.message = "Tell me a little about the project.";
  else if (v.message.trim().length < 10) e.message = "A few more words, please.";

  return e;
}

/**
 * Email / phone / message enquiry form. Shared by the Hire Me modal and the
 * Contact section so both always behave identically.
 *
 * @param idPrefix   unique prefix for field ids (two instances live on one page)
 * @param autoFocus  focus the first field on mount (modal only)
 * @param onDone     rendered as a "Done" button on the success screen
 * @param resetKey   change this value to clear the form
 */
export default function ContactForm({
  idPrefix = "contact",
  autoFocus = false,
  onDone,
  resetKey,
  titleId,
  heading = "Hire Me",
  kicker = "Let's work together",
  description = "Tell me how to reach you and what you're building — I reply within 24 hours.",
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const formRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    setValues(EMPTY);
    setErrors({});
    setSent(false);
  }, [resetKey]);

  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [autoFocus, resetKey]);

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // focus the first field that failed
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    // No backend in this project — hand the enquiry to the visitor's mail
    // client, prefilled. Swap this block for a POST to your API/Formspree
    // endpoint when one exists.
    const subject = `Hire me enquiry from ${values.email.trim()}`;
    const body = [
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  if (sent) {
    return (
      <div className="relative px-1 py-8 text-center xs:px-2 xs:py-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-fern-500 to-flame-600 text-white">
          <CheckCircle2 size={26} />
        </span>
        <h3
          id={titleId}
          className="mt-5 font-display text-xl font-extrabold text-ink xs:text-2xl"
        >
          Almost there!
        </h3>
        <p className="mx-auto mt-3 max-w-sm break-words text-sm leading-relaxed text-ink-muted xs:text-[1rem]/[1.5rem]">
          Your mail app should have opened with the message ready to send to{" "}
          <span className="text-ink">{profile.email}</span>. Hit send and
          I&apos;ll reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={onDone ? onDone : () => setSent(false)}
          className="btn-gradient mt-8 text-sm"
        >
          {onDone ? "Done" : "Send another"}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative">
      {kicker && <p className="kicker">{kicker}</p>}
      {heading && (
        <h3
          id={titleId}
          className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink xs:text-2xl"
        >
          {heading}
        </h3>
      )}
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
      )}

      <div className="mt-6 space-y-4">
        <Field
          ref={firstFieldRef}
          idPrefix={idPrefix}
          name="email"
          type="email"
          label="Email"
          placeholder="you@company.com"
          Icon={Mail}
          value={values.email}
          onChange={setField("email")}
          error={errors.email}
        />
        <Field
          idPrefix={idPrefix}
          name="phone"
          type="tel"
          label="Phone number"
          placeholder="+91 98765 43210"
          Icon={Phone}
          value={values.phone}
          onChange={setField("phone")}
          error={errors.phone}
        />
        <Field
          idPrefix={idPrefix}
          name="message"
          label="Message"
          placeholder="A bit about the project, timeline and budget…"
          Icon={MessageSquare}
          value={values.message}
          onChange={setField("message")}
          error={errors.message}
          textarea
        />
      </div>

      <button type="submit" className="btn-gradient mt-7 w-full justify-center">
        <Send size={17} />
        Send enquiry
      </button>
    </form>
  );
}

const Field = forwardRef(function Field(
  { idPrefix, name, label, Icon, error, textarea, ...rest },
  ref
) {
  const id = `${idPrefix}-${name}`;
  const errorId = `${id}-error`;
  const base =
    "w-full rounded-xl border bg-white/[0.03] py-3 pl-9 pr-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft focus:bg-white/[0.05] xs:pl-10 xs:pr-4";
  const tone = error
    ? "border-red-400/60 focus:border-red-400"
    : "border-white/[0.10] focus:border-white/25";

  return (
    <div className="text-left">
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          aria-hidden
          className={`pointer-events-none absolute left-3 xs:left-3.5 ${
            textarea ? "top-3.5" : "top-1/2 -translate-y-1/2"
          } text-ink-faint`}
        />
        {textarea ? (
          <textarea
            id={id}
            name={name}
            ref={ref}
            rows={4}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`${base} ${tone} resize-none`}
            {...rest}
          />
        ) : (
          <input
            id={id}
            name={name}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`${base} ${tone}`}
            {...rest}
          />
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});
