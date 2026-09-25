import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Helper to escape HTML to prevent HTML injection in the email body
function escapeHtml(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Simple IP-based rate limiting (in-memory)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now - v.firstReq > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(k);
      }
    }
  }

  if (!record || now - record.firstReq > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstReq: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Disposable / Throwaway email domains blocklist
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
  "yopmail.com",
  "throwawaymail.com",
  "dispostable.com",
  "trashmail.com",
  "sharklasers.com",
  "getairmail.com",
  "generator.email",
  "fakemailgenerator.com",
  "temp-mail.org",
  "tempmailo.com",
  "mohmal.com",
  "crazymailing.com",
  "mailnesia.com",
  "mytemp.email",
]);

// Spam keywords commonly used by automated spam bots
const SPAM_KEYWORDS = [
  "viagra",
  "cialis",
  "casino",
  "crypto investment",
  "forex trade",
  "page 1 on google",
  "rank on google",
  "seo backlink",
  "buy backlinks",
  "guest posting service",
  "dating site",
  "adult content",
];

export async function POST(req) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, message, honeypot, user_fax_id, mountedAt } = body;

    // 1. Double Honeypot: Automated bots fill hidden fields
    if (honeypot || user_fax_id) {
      return NextResponse.json({ success: true, message: "Your message has been sent successfully!" });
    }

    // 2. Speed Trap: Real humans take at least 2.5 seconds to fill the form
    if (mountedAt && Date.now() - Number(mountedAt) < 2500) {
      return NextResponse.json({ success: true, message: "Your message has been sent successfully!" });
    }

    // 3. Name Validation: Real names only, no links or spam codes
    const trimmedName = typeof name === "string" ? name.trim() : "";
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 70) {
      return NextResponse.json(
        { error: "Please enter your real name (at least 2 characters)." },
        { status: 400 }
      );
    }
    if (/https?:\/\/|\.com|\.net|\.org|\.ru|www\./i.test(trimmedName)) {
      return NextResponse.json(
        { error: "Name field cannot contain website links or URLs." },
        { status: 400 }
      );
    }

    // 4. Email Validation & Disposable Domain Block
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    const domain = trimmedEmail.split("@")[1];
    if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
      return NextResponse.json(
        { error: "Temporary/disposable email addresses are not accepted. Please use your genuine email." },
        { status: 400 }
      );
    }

    // 5. Phone Validation & Fake Dummy Number Detection
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json(
        { error: "Please provide a valid phone number (7 to 15 digits)." },
        { status: 400 }
      );
    }
    // Block repeating digits (e.g., 00000000, 11111111) or sequential numbers (e.g., 1234567890)
    const isRepeatedDigits = /^(\d)\1{6,}$/.test(phoneDigits);
    const isDummySequence = /^(0123456789|1234567890|9876543210|12345678|123456789)$/.test(phoneDigits);
    if (isRepeatedDigits || isDummySequence) {
      return NextResponse.json(
        { error: "Please provide a genuine contact number." },
        { status: 400 }
      );
    }

    // 6. Message Validation & Anti-Link-Spam Protection
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    if (!trimmedMessage || trimmedMessage.length < 10) {
      return NextResponse.json(
        { error: "Please write a brief message (minimum 10 characters)." },
        { status: 400 }
      );
    }
    if (trimmedMessage.length > 3000) {
      return NextResponse.json(
        { error: "Message is too long (maximum 3000 characters)." },
        { status: 400 }
      );
    }

    // Block promotional link spam (more than 1 URL in message)
    const urlMatches = trimmedMessage.match(/https?:\/\/|www\./gi) || [];
    if (urlMatches.length > 1) {
      return NextResponse.json(
        { error: "Link spam is not permitted. Please remove external promotional links." },
        { status: 400 }
      );
    }

    // Block known automated spam keywords
    const lowerMessage = trimmedMessage.toLowerCase();
    for (const kw of SPAM_KEYWORDS) {
      if (lowerMessage.includes(kw)) {
        return NextResponse.json(
          { error: "Message was rejected by spam protection filter." },
          { status: 400 }
        );
      }
    }

    const userEmail = process.env.GMAIL_USER || process.env.EMAIL_USER;
    const userPass = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || userEmail || "anandkpp2023@gmail.com";

    // If credentials are not configured yet, notify user so they can set up .env.local
    if (!userEmail || !userPass) {
      console.warn("Nodemailer: GMAIL_USER or GMAIL_APP_PASSWORD not set in environment.");
      return NextResponse.json(
        {
          error: "Email service is not configured yet. Please set GMAIL_USER and GMAIL_APP_PASSWORD.",
          configured: false,
        },
        { status: 503 }
      );
    }

    // Configure Nodemailer transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: userPass.replace(/\s+/g, ""), // strip any spaces if pasted from Google App Password
      },
    });

    const safeName = escapeHtml(trimmedName || "Portfolio Visitor");
    const safeEmail = escapeHtml(trimmedEmail);
    const safePhone = escapeHtml(trimmedPhone || "Not provided");
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br/>");
    const cleanPhoneDigits = trimmedPhone.replace(/[^\d+]/g, "");

    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const whatsappUrl = cleanPhoneDigits
      ? `https://wa.me/${cleanPhoneDigits.replace('+', '')}?text=${encodeURIComponent(`Hi ${trimmedName || ""}, thanks for reaching out via my portfolio!`)}`
      : "";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Message — Anand Sharma Portfolio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04); border: 1px solid #e2e8f0;">
          
          <!-- Top Gradient Accent Bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%); height: 6px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 32px 32px 24px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 5px 12px; background-color: #eef2ff; border-radius: 9999px; color: #4f46e5; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px;">
                      📩 Portfolio Contact Form
                    </div>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; line-height: 1.3;">
                      New Message from ${safeName}
                    </h1>
                    <p style="margin: 6px 0 0; font-size: 13px; color: #64748b;">
                      Received on ${formattedDate} IST &bull; via anand-sharma-portfolio
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Details Card -->
          <tr>
            <td style="padding: 24px 32px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="28" style="vertical-align: middle;">
                          <span style="font-size: 18px;">👤</span>
                        </td>
                        <td style="vertical-align: middle;">
                          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Name</div>
                          <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 2px;">${safeName}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="28" style="vertical-align: middle;">
                          <span style="font-size: 18px;">✉️</span>
                        </td>
                        <td style="vertical-align: middle;">
                          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Email</div>
                          <div style="margin-top: 2px;">
                            <a href="mailto:${safeEmail}" style="font-size: 15px; font-weight: 600; color: #4f46e5; text-decoration: none;">${safeEmail}</a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 16px 20px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="28" style="vertical-align: middle;">
                          <span style="font-size: 18px;">📞</span>
                        </td>
                        <td style="vertical-align: middle;">
                          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Phone</div>
                          <div style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 2px;">
                            ${safePhone}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Quick Reply Actions -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
                      Quick Actions
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <tr>
                        ${whatsappUrl ? `
                        <td style="padding-right: 8px; width: 50%;">
                          <a href="${whatsappUrl}" target="_blank" style="display: block; text-align: center; background-color: #16a34a; color: #ffffff; padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 4px rgba(22, 163, 74, 0.2);">
                            💬 Chat on WhatsApp
                          </a>
                        </td>
                        ` : ''}
                        <td style="${whatsappUrl ? 'padding-left: 8px; width: 50%;' : 'width: 100%;'}">
                          <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Connecting via Portfolio - Anand Sharma`)}" style="display: block; text-align: center; background-color: #4f46e5; color: #ffffff; padding: 12px 16px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);">
                            ✉️ Reply via Email
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
                  💬 Message
                </div>
                <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; border-radius: 8px; padding: 18px 20px; color: #1e293b; font-size: 15px; line-height: 1.65; white-space: normal; word-break: break-word;">
                  ${safeMessage}
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="padding: 20px 32px 28px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                Tip: Directly click <b>Reply</b> in Gmail to respond to <a href="mailto:${safeEmail}" style="color: #4f46e5; text-decoration: none; font-weight: 600;">${safeEmail}</a>.
              </p>
              <p style="margin: 8px 0 0; font-size: 11px; color: #94a3b8;">
                Anand Sharma Portfolio &bull; Sent automatically via Next.js Server
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const plainTextContent = `=====================================================
New Message — Anand Sharma Portfolio
=====================================================

Received: ${formattedDate} IST

FROM:
- Name:  ${trimmedName || "Visitor"}
- Email: ${trimmedEmail}
- Phone: ${trimmedPhone || "Not provided"}

MESSAGE:
-----------------------------------------------------
${trimmedMessage}
-----------------------------------------------------

QUICK ACTIONS:
- Reply to Email: mailto:${trimmedEmail}
${cleanPhoneDigits ? `- WhatsApp: https://wa.me/${cleanPhoneDigits.replace('+', '')}\n` : ""}
=====================================================
Sent from your portfolio contact form.
Direct reply to this email will reach ${trimmedEmail}.`;

    await transporter.sendMail({
      from: `"Portfolio Updates" <${userEmail}>`,
      to: receiverEmail,
      replyTo: trimmedEmail,
      subject: `📩 [Portfolio] Message from ${trimmedName || "Visitor"} (${trimmedPhone || trimmedEmail})`,
      headers: {
        "Auto-Submitted": "auto-generated",
        "X-Auto-Response-Suppress": "All",
        "X-Category": "Updates",
        "X-Entity-Ref-ID": `msg-${Date.now()}`,
        "Precedence": "notification",
      },
      text: plainTextContent,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Nodemailer Send Error:", error);
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
