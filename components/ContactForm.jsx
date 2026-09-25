"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { profile } from "@/lib/data";
import { burst } from "./ConfettiButton";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+(]?[\d][\d\s().-]{6,}$/;

const EMPTY = { name: "", email: "", phone: "", message: "", honeypot: "", user_fax_id: "" };

function validate(v) {
  const e = {};
  const trimmedName = v.name.trim();
  if (!trimmedName) {
    e.name = "Your name is required.";
  } else if (trimmedName.length < 2) {
    e.name = "Name must be at least 2 characters.";
  } else if (/https?:\/\/|\.com|\.net|\.org|www\./i.test(trimmedName)) {
    e.name = "Name cannot contain website links.";
  }

  const trimmedEmail = v.email.trim();
  if (!trimmedEmail) {
    e.email = "Email is required.";
  } else if (!EMAIL_RE.test(trimmedEmail)) {
    e.email = "Enter a valid email address.";
  }

  const trimmedPhone = v.phone.trim();
  const digits = trimmedPhone.replace(/\D/g, "");
  if (!trimmedPhone) {
    e.phone = "Phone number is required.";
  } else if (digits.length < 7 || digits.length > 15 || !PHONE_RE.test(trimmedPhone)) {
    e.phone = "Enter a valid phone number (7 to 15 digits).";
  } else if (/^(\d)\1{6,}$/.test(digits) || /^(0123456789|1234567890|9876543210|12345678)$/.test(digits)) {
    e.phone = "Please provide a genuine phone number.";
  }

  const trimmedMessage = v.message.trim();
  if (!trimmedMessage) {
    e.message = "Please write a brief message.";
  } else if (trimmedMessage.length < 10) {
    e.message = "A few more words, please (min 10 characters).";
  } else {
    const urls = trimmedMessage.match(/https?:\/\/|www\./gi) || [];
    if (urls.length > 1) {
      e.message = "Please remove external promotional links from your message.";
    }
  }

  return e;
}

/**
 * Robust, production-grade contact enquiry form.
 * Directly communicates with /api/contact (Nodemailer Gmail SMTP)
 * with automatic fallback to WhatsApp/Email if needed.
 */
export default function ContactForm({
  idPrefix = "contact",
  autoFocus = false,
  onDone,
  resetKey,
  titleId,
  heading = "Hire Me",
  kicker = "Let's work together",
  description = "Have an opportunity, job opening, or project in mind? Drop a message and I'll reply within 24 hours.",
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverError, setServerError] = useState("");

  const formRef = useRef(null);
  const firstFieldRef = useRef(null);
  const mountedAtRef = useRef(Date.now());

  useEffect(() => {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
    setServerError("");
    mountedAtRef.current = Date.now();
  }, [resetKey]);

  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [autoFocus, resetKey]);

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    if (serverError) setServerError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, mountedAt: mountedAtRef.current }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to send message right now.");
      }

      setStatus("success");
      burst(0.5);
    } catch (err) {
      console.error("Contact Form Error:", err);
      setStatus("error");
      setServerError(
        err.message || "Failed to send message. You can also contact me directly via Email or WhatsApp below."
      );
    }
  };

  const handleManualEmailFallback = () => {
    const subject = `Hire me enquiry from ${values.name || values.email}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppFallback = () => {
    const cleanPhone = (profile.phone || "+919479454314").replace(/[^\d]/g, "");
    const text = `Hi Anand, I'm ${values.name || "reaching out"}.\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.message}`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (status === "success") {
    return (
      <div className="relative px-1 py-8 text-center xs:px-2 xs:py-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-fern-500 to-flame-600 text-white shadow-lg shadow-flame-500/20">
          <CheckCircle2 size={28} />
        </span>
        <h3
          id={titleId}
          className="mt-5 font-display text-xl font-extrabold text-ink xs:text-2xl"
        >
          Message Received!
        </h3>
        <p className="mx-auto mt-3 max-w-sm break-words text-sm leading-relaxed text-ink-muted xs:text-[1rem]/[1.5rem]">
          Thank you, <span className="font-semibold text-ink">{values.name || "there"}</span>! Your message has been sent directly to{" "}
          <span className="text-ink">{profile.email}</span>. I will review it and get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={
            onDone
              ? onDone
              : () => {
                  setValues(EMPTY);
                  setStatus("idle");
                }
          }
          className="btn-gradient mt-8 text-sm"
        >
          {onDone ? "Done" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative">
      {/* Honeypot fields for bot & automated spam protection */}
      <input
        type="text"
        name="honeypot"
        value={values.honeypot}
        onChange={setField("honeypot")}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input
        type="text"
        name="user_fax_id"
        value={values.user_fax_id}
        onChange={setField("user_fax_id")}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

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

      {status === "error" && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-left text-sm text-red-200">
          <div className="flex items-start gap-2.5">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
            <div className="flex-1">
              <p className="font-medium text-red-300">{serverError}</p>
              <p className="mt-1 text-xs text-red-300/80">
                You can retry sending or reach me instantly via:
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleWhatsAppFallback}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/80 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600"
                >
                  WhatsApp <ExternalLink size={12} />
                </button>
                <button
                  type="button"
                  onClick={handleManualEmailFallback}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  Direct Email <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <Field
          ref={firstFieldRef}
          idPrefix={idPrefix}
          name="name"
          type="text"
          label="Your Name"
          placeholder="e.g. Rahul Verma"
          Icon={User}
          value={values.name}
          onChange={setField("name")}
          error={errors.name}
          disabled={status === "submitting"}
        />
        <Field
          idPrefix={idPrefix}
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@company.com"
          Icon={Mail}
          value={values.email}
          onChange={setField("email")}
          error={errors.email}
          disabled={status === "submitting"}
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
          disabled={status === "submitting"}
        />
        <Field
          idPrefix={idPrefix}
          name="message"
          label="Message"
          placeholder="Hi Anand, I'd like to discuss a job role / opportunity / project…"
          Icon={MessageSquare}
          value={values.message}
          onChange={setField("message")}
          error={errors.message}
          textarea
          disabled={status === "submitting"}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gradient mt-7 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Sending message…
          </>
        ) : (
          <>
            <Send size={17} />
            Send enquiry
          </>
        )}
      </button>
    </form>
  );
}

const Field = forwardRef(function Field(
  { idPrefix, name, label, Icon, error, textarea, disabled, ...rest },
  ref
) {
  const id = `${idPrefix}-${name}`;
  const errorId = `${id}-error`;
  const base =
    "w-full rounded-xl border bg-white/[0.03] py-3 pl-9 pr-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft focus:bg-white/[0.05] disabled:opacity-50 xs:pl-10 xs:pr-4";
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
            disabled={disabled}
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
            disabled={disabled}
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
